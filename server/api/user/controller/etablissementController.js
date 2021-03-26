const { response } = require("express");
const Etablissement = require("../model/Etablissement");


// CREATE 
exports.createNewEtablissement = async (req, res) => {
  try {
    let isEtablissment = await Etablissement.find({ nom: req.body.nomEtablissement });
    if (isEtablissment.length >= 1) {
      return res.status(409).json({
        message: "Etablissement deja existant"
      });
    }
    const etablissement = new Etablissement({
      nom: req.body.nomEtablissement,
      ville: req.body.villeEtablissement,
      codePostal: req.body.codePostal,
      pays: req.body.paysEtablissement
    });
   let data = await etablissement.save();
    res.status(201).json({ data });
  }catch (err) {
    res.status(400).json({ err: err });
  }
};

// GET
exports.getEtablissementByNom = async (req, res) => {
  try {
    const etablissement = await Etablissement.find({ nom: req.body.nom });
    res.status(201).json({ etablissement });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.getAllEtablissement = async (req, res) => {
  try {
    const etablissement = await Etablissement.find();
    res.status(201).json({ etablissement });
  } catch (err) {
    res.status(400).json({ err: err });
  }
}