const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../configs/db");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const userId = result.insertId;

    const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res
      .status(201)
      .json({ status: true, msg: "User signup successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ status: true, token });
    } else {
      return res.status(401).json({ status: false, message: "Invalid credentials"});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = { signup, login };
