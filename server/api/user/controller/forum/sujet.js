const { response } = require("express");
const Forum = require("../../model/forum/Forum");
const Sujet = require("../../model/forum/Sujet");


exports.createNewSujet = async (req,res) => {
    try {
        let isSujet = await Sujet.find({ titreSujet : req.body.ttireSujet});
        if(isSujet.length >= 1 ){
            return res.status(409).json({
                message : "Ce sujet existe déja !"
            })
        }
       
        const sujet = new Sujet({
            titreSujet : req.body.titreSujet,
            descriptionSujet : req.body.descriptionSujet,
            dateSujet : req.body.dateSujet,
            illustrationSujet : req.body.illustrationSujet,
            statutSujet : req.body.statutSujet,
            auteurSujet : req.body.auteurSujet,
            forumSujet : req.body.forumSujet
        });

        let data = await sujet.save();
        let forum = await Forum.findOne({_id : sujet.forumSujet});
        forum.listeSujets.push(sujet);
        await forum.save();
        console.log(forum);
        res.status(201).json({ data });
      }catch (err) {
          console.log(err);
        res.status(400).json({ err: err });
      }
}


exports.getOneSujet = async (req,res) => {
    try{
      
        let sujet = await Sujet.findOne({_id : req.query.idSujet});
        console.log(sujet)
        res.status(201).json({sujet});
    }catch(err){
        res.status(404).json({err : err});
    }
}