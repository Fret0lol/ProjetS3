const express = require("express");
const router = express.Router();

// Image System
const multer = require("multer");
const upload = multer({
  
})

const serviceController = require("../controller/service.controller");


// Enregistrement
router.post("/register", serviceController.registerNewService);

// // Upload Image
// router.post("/")
// GET avec paramètres
router.get("/get", serviceController.getServiceByParams);

// // UPDATE avec nom
// router.put("/update", organisationController.updateOrganisation);

// DELETE avec nom
router.delete("/delete", serviceController.deleteService);

module.exports = router;