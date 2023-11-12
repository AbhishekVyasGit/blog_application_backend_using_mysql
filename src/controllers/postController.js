const { db } = require("../configs/db");

// create post
const createdPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user)
      return res
        .status(401)
        .json({ status: false, error: "Unauthorized user" });

    await db.execute(
      "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
      [title, content, req.user.userId]
    );

    res
      .status(201)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};

// get my posts
const getMyPosts = async (req, res) => {
  try {
    const [posts] = await db.execute("SELECT * FROM posts WHERE user_id = ?", [
      req.user.userId,
    ]);

    return res.status(200).json({ status: true, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};

// get profile
const getProfile = async (req, res) => {
  try {
    const [users] = await db.execute("SELECT id, name, email FROM users");

    return res.status(200).json({ status: true, users });
  } catch (error) {
    return res.status(500).json({ status: false, error: error.message });
  }
};

module.exports = { createdPost, getMyPosts, getProfile };
