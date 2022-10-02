const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
} = require("../controllers/postController");
const router = express.Router();

// importing the middleware
const isLoggedin = require("../middlewares/isLoggedin");

// making the routes
// here we have to add isLoggedin first as it's middleware which will be executed before createPost
router.route("/create").post(isLoggedin, createPost);
router.route("/update/:id").put(isLoggedin, updatePost);
router.route("/delete/:id").delete(isLoggedin, deletePost);
router.route("/getpost").get(getPosts);

module.exports = router;
