
const express = require("express");
const router = express.Router();
const forumController = require("../controller/forum/forumController");



router.post("/addForum",forumController.createNewForum);

router.get("/",forumController.getForums);

router.post("/deleteForum",forumController.deleteForum)
router.put('/:titreForum',forumController.getSujets)
module.exports = router;