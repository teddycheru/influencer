const jwt = require("jsonwebtoken");
const User = require("../models/User/user");
const dotenv = require("dotenv");

dotenv.config({ path: ".././src/config/config.env" });

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log("token", token);
    if (!token) {
      return res.status(401).json({ success: false, message: "Not logged in" });
    }
    const decoded = jwt.verify(
      token?.split("Bearer ")[1],
      process.env.JWT_SECRET
    );
    // console.log("decoded", decoded);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { isAuthenticated };
