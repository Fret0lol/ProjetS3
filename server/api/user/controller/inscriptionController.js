const { response } = require("express");
const Inscription = require("../model/Inscription");
const Etablissement = require("../model/Etablissement");
const User = require("../model/User");
const Formation = require("../model/Formation");
const mongoose = require("mongoose");

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
    console.log(isEtablissment._id);
    // Test si Utilisateur déjà connu ou non
    let isUser = await User.find({ email: req.body.utilisateur });
    if (isUser.length < 1) {
      return res.status(409).json({
        message: "Utilisateur non-répertorié dans notre base de données"
      });
    }
    console.log(isUser._id)
    // Test si Formation déjà connue ou non
    let isFormation = await Formation.find({intitulé_formation_long: req.body.formation});
    if (isFormation.length < 1) {
      return res.status(409).json({
        message: "Formation non-répertorié dans notre base de données"
      });
    }
    console.log(isFormation._id)
    const inscription = new Inscription({
      date_entrée: req.body.date_entrée,
      date_sortie: req.body.date_sortie,
      utilisateurId: isUser._id,
      formationId: isFormation._id,
      etablissementId: isEtablissment._id
    });
    let data = await inscription.save();
    res.status(201).json({ data });
  } catch(err) {
    res.status(400).json({ err: err });
  }
};

// GET BY USER
exports.getByUser = async (req, res) => {
  try {
    let isUser = await User.findOne({ email: req.body.utilisateur });
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "Utilisateur non-répertorié dans notre base de données"
      });
    }
    console.log(isUser._id)
    const inscription = await Inscription.find().populate('utilisateurId');
    console.log(inscription);
    res.status(201).json({ inscription });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};