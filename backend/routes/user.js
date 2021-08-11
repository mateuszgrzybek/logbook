const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../config/auth");

// /api/user/register POST
// /api/user/login POST
// /api/user/getUser GET
// /api/user/addEntry PUT
// /api/user/deleteEntry PUT

// Register new user
router.post("/register", userController.registerNewUser);

// Allow user to log in
router.post("/login", userController.loginUser);

// Get user
router.get("/getUser", auth, userController.getUserDetails);

// Add new user entry
router.put("/addEntry", userController.addUserEntry);

// Delete user entry
router.put("/deleteEntry", userController.deleteUserEntry);

module.exports = router;
