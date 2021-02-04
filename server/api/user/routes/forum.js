
const express = require("express");
const router = express.Router();
const forumController = require("../controller/forum/forumController");

router.post("/addForum",forumController.createNewForum);


module.exports = router;