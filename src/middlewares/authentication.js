require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const authenticateToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user;

        next();
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = authenticateToken;