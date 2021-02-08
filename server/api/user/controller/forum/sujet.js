const { response } = require("express");
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
        res.status(201).json({ data });
      }catch (err) {
        res.status(400).json({ err: err });
      }
}