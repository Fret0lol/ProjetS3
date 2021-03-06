
const express = require("express");
const router = express.Router();
const forumController = require("../controller/forum/forumController");
const sujetController = require("../controller/forum/sujet");
const postController = require('../controller/forum/post')
const signalControler = require('../controller/forum/signal')

router.post("/addForum",forumController.createNewForum);
router.get("/",forumController.getForums);
router.post("/deleteForum",forumController.deleteForum);
router.get('/myForum',forumController.getOneForum);
router.get('/listeSujet',forumController.getAllSujets);
router.post('/createPost',postController.createNewPost);
router.get('/getSujet',sujetController.getOneSujet);
router.post('/addSujet',sujetController.createNewSujet);
router.get('/getPosts',postController.getAllPost);
router.put('/deletePost',postController.deletePost);
router.put('/updatePost', postController.updatePost);
router.get('/getOnePost',postController.getOnePost)
router.post('/createSignal',signalControler.createSignal)
router.get('/forumID',forumController.findByIdForum)
router.get('/forumLimit',forumController.getForumsLimit)
router.get('/admin_signal',signalControler.getSignalements)
// router.post('/valideSignal',signalControler.deleteSignal)
router.post('/deleteSignal',signalControler.deleteSignal)
module.exports = router;