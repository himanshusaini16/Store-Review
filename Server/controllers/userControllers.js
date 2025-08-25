import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sql from "../config/db.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, address } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    //console.log(req.body)
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const existingUser = await sql.unsafe(`SELECT * FROM users WHERE email = '${email}'`);

    if (existingUser.length > 0) {
      return res.json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [user] = await sql`
      INSERT INTO users (name, email, password, role,address)
      VALUES (${name}, ${email}, ${hashedPassword}, ${
      role || "user"
    },${address})
      RETURNING id, name, email, role, address, created_at;
    `;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        token,
        user,
      });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.json({
        success: false,
        message: "Email, Password, and Role are required",
      });
    }

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result[0]; // Get first row

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    if (user.role !== role) {
      return res.json({ success: false, message: "Role does not match" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET
    );

    res.json({ success: true, token, user });
  } catch (error) {
    //console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }
    const user =
      await sql`SELECT id, email, role, name, Address FROM users WHERE id = ${userId}`;
    //console.log(user)

    if (!user || user.length === 0) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    //console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await sql`SELECT * FROM stores`;

    if (stores) {
      res.status(200).json({ success: true, data: stores });
    } else {
      res.json({ success: false, message: "No any Data is found " });
    }
  } catch (error) {
    //console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const storeGetById = async (req, res) => {
  try {
    const { id } = req.params;

    const store = await sql`
      SELECT 
        s.id,
        s.name,
        s.description,
        s.address,
        s.created_at,
        u.name AS owner_name
      FROM stores s
      JOIN users u ON s.owner_id = u.id
      WHERE s.id = ${id}
      LIMIT 1
    `;

    //console.log("Store",store)

    if (store.length > 0) {
      res.status(200).json({ success: true, data: store });
    } else {
      res.json({ success: false, message: "No store found with this ID" });
    }
  } catch (error) {
    //console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const ratings = async (req, res) => {
  try {
    const userId = req.userId;
    const { store_id, rating, comment } = req.body;

    if (!userId || !store_id || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const result = await sql`
      INSERT INTO ratings (user_id, store_id, rating, comment)
      VALUES (${userId}, ${store_id}, ${rating}, ${comment})
      ON CONFLICT (user_id, store_id)
      DO UPDATE SET rating = EXCLUDED.rating, comment = EXCLUDED.comment, created_at = CURRENT_TIMESTAMP
      RETURNING *;
    `;

    //console.log(result)
    res.json({ success: true, data: result[0] });
  } catch (error) {
    //console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const { id } = req.params; // store_id

    const result = await sql`
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.created_at,
        u.name AS user_name,
        u.email AS user_email
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ${id}
      ORDER BY r.created_at DESC
    `;
    //console.log(result)
    if (result.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No ratings found" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    //console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const averageRating = async (req, res) => {
  try {
    const result = await sql`
      SELECT 
        store_id,
        ROUND(AVG(rating), 1) AS avg_rating
      FROM ratings
      GROUP BY store_id
    `;

    //console.log(result)

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, address } = req.body;

    // console.log(req.body)

    // console.log("update profile",userId)

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const updatedUser = await sql`
  UPDATE users 
  SET name = ${name}, email = ${email}, address = ${address}
  WHERE id = ${userId}
  RETURNING id, name, email
`;
    // console.log("Update user",updatedUser)

    if (updatedUser.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    //console.error("Error updating profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const userId = req.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await sql`SELECT * FROM users WHERE id = ${userId}`;
    if (user.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // console.log("Reset",user)
    const isMatch = await bcrypt.compare(oldPassword, user[0].password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Old password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE id = ${userId}
      RETURNING id, email`;

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      user: updatedUser[0],
    });
  } catch (error) {
    //console.error("Error resetting password:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting password",
      error: error.message,
    });
  }
};

const getStoreByOwnerId = async (req, res) => {
  try {
    const userId = req.userId;
    //console.log("User id from getStoreById",userId)
    const store = await sql`SELECT * FROM stores WHERE owner_id = ${userId}`;
    //console.log("Stores",store)

    res.status(200).json({ success: true, data: store });
  } catch (error) {
    //console.error("Unable to fecth:", error);
    res.status(500).json({
      success: false,
      message: "Enable to fectch the data",
    });
  }
};

const avgRatingAtOwner = async (req, res) => {
  try {
    const ownerId = req.userId;

    //console.log("OwnerUId",ownerId)
    const avgResult = await sql`
      SELECT ROUND(AVG(rating), 1) AS avg_rating
      FROM ratings r
      JOIN stores s ON r.store_id = s.id
      WHERE s.owner_id = ${ownerId};
    `;
    const details = await sql`
      SELECT u.name AS user_name, u.email AS user_email,
             r.rating, r.comment, s.name AS store_name
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      JOIN stores s ON r.store_id = s.id
      WHERE s.owner_id = ${ownerId}
      ORDER BY r.created_at DESC;
    `;

    res.status(200).json({
      success: true,
      averageRating: avgResult[0]?.avg_rating || 0,
      reviews: details,
    });
  } catch (error) {
    //console.error("Error fetching owner ratings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching owner ratings",
    });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  getAllStores,
  storeGetById,
  ratings,
  getAllRatings,
  averageRating,
  updateProfile,
  resetPassword,
  getStoreByOwnerId,
  avgRatingAtOwner,
};
