const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const formationController = require("../controller/formationController");

router.post("/createFormation", formationController.createFormation);
router.get("/getFormationByName", formationController.getFormationByNom);
router.get("/getAllFormations", formationController.getAllFormation);

module.exports = router;