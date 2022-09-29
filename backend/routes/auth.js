const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/userController");

// here in post() and get() we are defining the controllers which we want to use for these routes
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
module.exports = router;
