const { response } = require("express");
const Inscription = require("../model/Inscription");
const Etablissement = require("../model/Etablissement");
const User = require("../model/User");
const Formation = require("../model/Formation");

// CREATE
exports.createNewInscription = async (req, res) => {
  try {
    // Test si Etablissement déjà connu ou non
    let isEtablissment = await Etablissement.find({ nom: req.body.etablissement });
    if (isEtablissment.length < 1) {
      return res.status(409).json({
        message: "Etablissement non-répertorié dans notre base de données"
      });
    }
    // Test si Utilisateur déjà connu ou non
    let isUser = await User.find({ nomUtilisateur: req.body.utilisateur });
    if (isUser.length < 1) {
      return res.status(409).json({
        message: "Utilisateur non-répertorié dans notre base de données"
      });
    }
    // Test si Formation déjà connue ou non
    let isFormation = await Formation.find({intitulé_formation_long: req.body.formation});
    if (isFormation.length < 1) {
      return res.status(409).json({
        message: "Formation non-répertorié dans notre base de données"
      });
    }
    const inscription = new Inscription({
      date_entrée: req.body.date_entrée,
      date_sortie: req.body.date_sortie,
      utilisateurId: isUser[0]._id,
      formationId: isFormation[0]._id,
      etablissementId: isEtablissment[0]._id,
      infoSupp: req.body.infoSupp
    });
    let data = await inscription.save();
    res.status(201).json({ data });
  } catch(err) {
    res.status(400).json({ err: err });
  }
};

// GET BY USERMAIL TO GET INSCRIPTION WITH FORMATION AND ETABLISSEMENT
exports.getByUser = async (req, res) => {
  try {
    let isUser = await User.findOne({ nomUtilisateur: req.query.nomUtilisateur });
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "Utilisateur non-répertorié dans notre base de données"
      });
    }
    const inscription = await Inscription.find({ utilisateurId: isUser._id }).populate([{ path: 'formationId'},{ path: 'etablissementId' }]);
    res.status(201).json({ inscription });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// UPDATE INSCRIPTION
exports.updateByUser = async (req, res) => {
  try {
    let isUser = await User.findOne({ nomUtilisateur: req.body.nomUtilisateur });
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "Utilisateur non-répertorié dans notre base de données"
      });
    }
    console.log(isUser._id);
    console.log(req.body.inscription)
    await Inscription.updateOne({ utilisateurId: isUser._id, _id: req.body.inscription._id }, req.body.inscription)
      .then(response => {
        res.status(201).json(response)
      });
  } catch (err) {
    res.status(400).json({ err: err});
  }
};