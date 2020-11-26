const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", auth, userController.getUserDetails);
router.get("/users", userController.getAllUsers);
router.get("/:email", userController.getUserbyEmail);
router.post("/update", auth, userController.updateUser);

// For Admin
router.put("/valide", userController.updateValidation);
router.post("/delete", userController.deleteUser);

module.exports = router;
