const { response } = require("express");
const Formation = require("../model/Formation");

// CREATE
exports.createFormation = async (req, res) => {
  try {
    let isFormation = await Formation.find({intitulé_formation_long: req.body.nomComplet});
    if (isFormation.length >= 1) {
      return res.status(409).json({
        message: "Formation déjà existante"
      });
    }
    const formation = new Formation({
      intitulé_formation_court: req.body.nomCourt, 
      intitulé_formation_long: req.body.nomComplet
    });
    let data = await formation.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({err: err});
  }
};

exports.getFormationByNom = async (req, res) => {
  try {
    let formation = await Formation.find({ intitulé_formation_long: req.body.nomComplet })
    res.status(201).json({ formation })
  } catch (err) {
    res.status(400).json({ err: err })
  }
}

exports.getAllFormation = async (req, res) => {
  try {
    let formation = await Formation.find()
    res.status(201).json({ formation })
  } catch (err) {
    res.status(400).json({ err: err })
  }
}