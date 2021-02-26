const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const etablissementController = require("../controller/etablissementController");

router.post("/createEtablissement", etablissementController.createNewEtablissement);
router.get("/getEtablissementByNom", etablissementController.getEtablissementByNom);
router.get("/getAllEtablissements", etablissementController.getAllEtablissement);

module.exports = router;
