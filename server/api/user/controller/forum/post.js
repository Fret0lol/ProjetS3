const { response } = require('express');
const Post = require('../../model/forum/commentaire');

exports.createNewPost = async (req,res) => {
    try{
      console.log("create a new post");
      console.log(req.body.params);
      const post = new Post({
        auteurCommentaire : req.body.params.auteurCommentaire,
        dateCommentaire : req.body.params.dateCommentaire,
        sujetRef : req.body.params.sujetRef,
        contenuCommentaire : req.body.params.contenuCommentaire, 
        delete : false
      });
      let data = post.save();
      res.status(201).json({data});
    }catch(err){
      console.log(err);
      res.status(404).json({err : err})
    }
  }


  exports.getAllPost = async (req,res) =>{
      try {
        console.log(req.query.sujetRef)
        let posts = await Post.find({sujetRef : req.query.sujetRef})  
        res.status(201).json({posts});
      } catch (err) {
          res.status(404).json({err:err})
      }
  }

  exports.deletePost = async (req,res) => {
    try{
      console.log(req)
      await Post.updateOne({ _id : req.body.id},{delete : true, contenuCommentaire : "Message supprimé"})
      .then(response => { res.status(201).json(response)})
    }catch(err){
      res.status(400).json({err :err});
    }
  }