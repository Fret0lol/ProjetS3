
const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");
const uploadController = require("../controller/uploadImage");
const multer = require("../../../config/imageConfig");



router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/upload", multer, userController.uploadFile);
router.get("/nomUtilisateur", userController.getUserbyNomUtilisateur);
router.get("/users/params", userController.getUserByParams); //A FINIR
router.get("/users", userController.getAllUsers);
//router.get("/users/etudiant", userController.getAllEtudiant);
router.get("/addForum",userController.getUserbyNomUtilisateur)
// Image
router.get("/image", userController.getImage)


router.put("/:nomUtilisateur", userController.updateUser);




// For Admin
router.put("/valide", userController.updateValidation);
router.post("/delete", userController.deleteUser);

module.exports = router;
