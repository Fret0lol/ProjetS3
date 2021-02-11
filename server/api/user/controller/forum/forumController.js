const { response } = require("express");
const Forum = require("../../model/forum/Forum");
const Sujet = require("../../model/forum/Sujet");


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
        console.log(forum);
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
  console.log("ma requete "  +  req)
  try{
    let listeSujets = await Sujet.find({titreForum : req.body.titreForum});
    
    res.status(201).json({listeSujets});
  }catch(err){
    console.log(err)
    res.status(401).json({err})
  }
    

}


/*
* Retourne le forum dont le nom est passé en param
*
*/

exports.getOneForum = async (req,res) => {
  try{
    
    let forum = await Forum.findOne({titreForum : req.query.titreForum});
    res.status(201).json({forum})
    
  }catch(err){
    console.log(err);
  }
  
}