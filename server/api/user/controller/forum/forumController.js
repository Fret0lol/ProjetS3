const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const Forum = require("../../model/forum/Forum");
const Sujet = require("../../model/forum/Sujet");
const Post = require('../../model/forum/commentaire');

// cree un nouveau forum 

exports.createNewForum = async (req,res) => {
  
    try {
        let isForum = await Forum.find({ titreForum : req.body.titreForum});
        if(isForum.length >= 1 ){
            return res.status(409).json({
                message : "Ce forum existe déja !"
            })
        }
       
        const forum = new Forum({
            titreForum : req.body.nomForum,
            descriptionForum : req.body.descriptionForum,
            dateForum : req.body.dateForum,
            illustrationForum : req.body.illustrationForum,
            typeForum : req.body.typeForum,
            auteurForum : req.body.auteurForum,
            listeSujets : new Array(),
        });
        let data = await forum.save();
        res.status(201).json({ data });
      }catch (err) {
        res.status(400).json({ err: err });
      }
    
}


/*
*   Retourne l'ensemble des forums de l'application 
*
*/

exports.getForums = async(req,res) => {
  try{
    let forums = await Forum.find({});
    res.status(201).json({forums})
  }catch(err){
    res.status(401).json(err);
  }
}


/*
* Supprime le forum passer en param
*
*/

exports.deleteForum = async(req,res) =>{
  try{

     await Forum.deleteOne({titreForum : req.body.titreForum });
     
     res.status(201).json({message : "Suppression réussie !"});
  }catch(err){
    res.status(401).json({err : err});
  }
}



exports.getSujets = async (req,res) => {
      try{
        
        let sujet = await Sujet.findOne({_id : ObjectId(req.query._id) });
        res.status(201).json({sujet});
      }catch(err){
        console.log(err);
      }
}


/*
* Retourne le forum dont le nom est passé en param
*
*/
exports.getForumsLimit = async (req,res) => {
  try {
    const limit = parseInt(req.query.limit)
    
    const rep = await Forum.find().limit(limit)
    res.status(201).json({rep})
  } catch (error) {
      res.status(404).json({error : error})
  }
}
exports.getOneForum = async (req,res) => {
  try{
    console.log(req.query)
    let forum = await Forum.findOne({titreForum : req.query.titreForum});
    res.status(201).json({forum})
    
  }catch(err){
    console.log(err);
  }
  
}

exports.findByIdForum = async (req,res) => {
  try {
    console.log(req.query)
    let forum = await Forum.findOne({_id : req.query._id})
  res.status(201).json({forum})
  } catch (error) {
    res.status(404).json({err :error})
  }
  
}

exports.getAllSujets = async (req,res) =>{
   try{
     let content = {
       forum : {},
       sujet : []
     }
     content.forum = await Forum.findOne({titreForum :req.query.titreForum});
     content.sujets = await Sujet.find({forumSujet : content.forum._id})
     return res.status(201).json({content});

   }catch(err){
     console.log(err);
   }
}



