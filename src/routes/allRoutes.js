const express = require("express");
const {signup, login} = require("../controllers/userController");
const { createdPost, getMyPosts, getProfile } = require("../controllers/postController");
const { signupValidation, loginValidation } = require("../validators/userValidate");
const authenticateToken = require("../middlewares/authentication")

const router = express.Router();


router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

router.post('/create-post',authenticateToken, createdPost);
router.get('/my-posts',authenticateToken, getMyPosts);

router.get('/profile', getProfile); 


// if API is Invalid OR wrong URL 
router.all("/**", function (req, res) {
  res.status(404).send({ status: false, msg: "The api you request is not available" })
});


module.exports = router;