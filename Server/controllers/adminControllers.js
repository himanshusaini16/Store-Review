import sql from "../config/db.js";

const totalNumberOfuser = async (req, res) => {
  try {
    const rows = await sql.unsafe(`
      SELECT role, COUNT(*) 
      FROM users
      GROUP BY role
    `);

    //console.log("Rows",rows)

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: "Error fetching user counts",
    });
  }
};

const storeOwner = async (req, res) => {
  try {
    const store_owner =
      await sql`SELECT id,name FROM users WHERE role = 'store'`;

    res.status(200).json({
      success: true,
      data: store_owner,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error to get the store owner" });
  }
};

const addStore = async (req, res) => {
  try {
    const { name, description, address, owner_id } = req.body;

    if (!name || !owner_id) {
      return res
        .status(400)
        .json({ success: false, message: "Name and Owner ID are required" });
    }

    const store = await sql`
      INSERT INTO stores (name, description, address, owner_id)
      VALUES (${name}, ${description}, ${address}, ${owner_id})
      RETURNING *
    `;

    console.log(store);

    res.status(201).json({ success: true, data: store });
  } catch (error) {
    // console.error("Error adding store:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getStores = async (req, res) => {
  try {
    const stores = await sql`
      SELECT 
        s.id,
        s.name,
        s.description,
        s.address,
        s.created_at,
        u.email AS owner_mail,
        u.name AS owner_name,
        ROUND(COALESCE(AVG(r.rating), 0), 1) AS avg_rating,  -- ✅ average rating
        COUNT(r.id) AS total_ratings               -- optional: how many ratings
      FROM stores s
      JOIN users u ON s.owner_id = u.id
      LEFT JOIN ratings r ON r.store_id = s.id     -- join with ratings
      GROUP BY s.id, u.email, u.name
      ORDER BY s.created_at DESC
    `;

    //console.log(stores);
    res.status(200).json({ success: true, data: stores });
  } catch (error) {
    //console.error("Error fetching stores:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const numOfStore = async (req, res) => {
  try {
    const totalNumberOfStores = await sql`SELECT Count(*) from stores`;
    //console.log(totalNumberOfStores)
    res.status(200).json({ success: true, data: totalNumberOfStores });
  } catch (error) {
    //console.error("Error fetching Number of Stores:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const allUser = async (req, res) => {
  try {
    const users = await sql`SELECT * FROM users`;

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const allRatings = async (req, res) => {
  try {
    const ratings = await sql`
      SELECT 
        r.id,
        u.name AS user_name,
        s.name AS store_name,
        r.comment,
        r.rating,
        ROUND(AVG(r.rating) OVER (PARTITION BY r.store_id), 2) AS avg_rating
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      JOIN stores s ON r.store_id = s.id
      ORDER BY r.created_at DESC
    `;

    //console.log("ratings",ratings)

    res.status(200).json({
      success: true,
      data: ratings,
    });
  } catch (error) {
    //console.error("Error fetching ratings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ratings",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //console.log("Request Body",req.body)
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Inavalid Crediantials" });
    }
  } catch (error) {
    //console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  totalNumberOfuser,
  storeOwner,
  addStore,
  getStores,
  numOfStore,
  allUser,
  allRatings,
  loginAdmin,
};
