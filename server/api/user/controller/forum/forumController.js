const { response } = require("express");
const Forum = require("../../model/forum/Forum");


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
            auteurForum : req.body.auteurForum
        });
        let data = await forum.save();
        res.status(201).json({ data });
      }catch (err) {
        res.status(400).json({ err: err });
      }
    
}

exports.getForums = async(req,res) => {
  try{
    let forums = await Forum.find({});
    res.status(201).json({forums})
  }catch(err){
    console.log(err)
  }
}