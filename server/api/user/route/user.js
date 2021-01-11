const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/nomUtilisateur", userController.getUserbyNomUtilisateur);
router.get("/users/params", userController.getUserByParams); //A FINIR
//router.get("/users", userController.getAllUsers);
//router.get("/users/etudiant", userController.getAllEtudiant);


router.put("/:nomUtilisateur", userController.updateUser);




// For Admin
router.put("/valide", userController.updateValidation);
router.post("/delete", userController.deleteUser);

module.exports = router;
