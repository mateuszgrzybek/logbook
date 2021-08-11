const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../config/auth");

// /api/user/register POST
// /api/user/login POST
// /api/user/getUser GET

// Register new user
router.post("/register", userController.registerNewUser);

// Allow user to log in
router.post("/login", userController.loginUser);

// Get user
router.get("/getUser", auth, userController.getUserDetails);

module.exports = router;
