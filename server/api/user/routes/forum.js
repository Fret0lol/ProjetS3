
const express = require("express");
const router = express.Router();
const forumController = require("../controller/forum/forumController");
const sujetController = require("../controller/forum/sujet");


router.post("/addForum",forumController.createNewForum);

router.get("/",forumController.getForums);

router.post("/deleteForum",forumController.deleteForum)
router.get('/:titreForum',forumController.getOneForum)

router.post('/addSujet',sujetController.createNewSujet)

module.exports = router;