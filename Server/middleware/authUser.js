import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized. Login again." });
    }

    // console.log("Token:",token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded:",decoded.id)
    req.userId = decoded.id;
    // console.log("userid:",req.userId)
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
