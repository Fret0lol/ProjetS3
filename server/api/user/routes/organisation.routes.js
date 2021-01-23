const express = require("express");
const router = express.Router();

// Image System
const multer = require("multer");
const upload = multer({
  
})

const organisationController = require("../controller/organisation.controller");


// Enregistrement
router.post("/register", organisationController.registerNewOrganisation);

// Upload Image
router.post("/")
// GET avec paramètres
router.get("/get", organisationController.getOrganisationByParams);

// UPDATE avec nom
router.put("/update", organisationController.updateOrganisation);

// DELETE avec nom
router.delete("/delete", organisationController.deleteOrganisation);

module.exports = router;