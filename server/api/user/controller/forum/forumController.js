const { response } = require("express");
const Forum = require("../../model/forum/Forum");


// cree un nouveau forum 

exports.createNewForum = async (req,res) => {
    try {
        let isForum = await Forum.find({ titreForum : req.body.titreForum});
        if(isForum.length >= 1 ){
            return res.status(409).json({
                message : "Ce titre de forum existe déja !"
            })
        }

        const forum = new Forum({
            tireForum : req.body.titreForum,
            descriptionForum : req.body.descriptionForum,
            dateForum : req.body.dateForum,
            illustrationForum : req.body.illustrationForum,
            typeForum : req.body.typeForum,
            statutForum : req.body.statutForum
        });
        let data = await forum.save();
        res.status(201).json({ data });
      }catch (err) {
        res.status(400).json({ err: err });
      }
    
}

// get forums  : 

exports.getForumsByNom = async (req, res) => {
    try {
      const forum = await Etablissement.find({ nom: req.body.nom });
      res.status(201).json({ forum });
    } catch (err) {
      res.status(400).json({ err: err });
    }
  };
