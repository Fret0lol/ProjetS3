const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const etablissementController = require("../controller/etablissementController");

router.post("/createEtablissement", etablissementController.createNewEtablissement);
// router.post("/login", userController.loginUser);
// router.get("/email", userController.getUserbyEmail);
router.get("/getEtablissementByNom", etablissementController.getEtablissementByNom); //A FINIR
// //router.get("/users", userController.getAllUsers);
// //router.get("/users/etudiant", userController.getAllEtudiant);


// router.put("/:email", userController.updateUser);




// For Admin
// router.put("/valide", userController.updateValidation);
// router.post("/delete", userController.deleteUser);

module.exports = router;