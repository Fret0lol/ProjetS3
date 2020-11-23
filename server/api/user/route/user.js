const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);
router.get("/users", userController.getAllUsers);
router.get("/:email", userController.getUserbyEmail);

module.exports = router;
