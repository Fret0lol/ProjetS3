const { response } = require("express");
const Organisation = require("../model/Organisation.model");
const Constantes = require("../../../config/controleChamps");

// Image
const Multer = require('multer');
const fs = require('fs');

// CREATE
exports.registerNewOrganisation = async (req, res) => {
  try {
    let isOrganisation = await Organisation.find({ nom: req.body.nom });
    console.log(isOrganisation);
    if (isOrganisation.length >= 1) {
      return res.status(409).json({
        message: "Organisation already exists"
      });
    }
    if (controle(req.body) === false) {
      return res.status(409).json({
        message: "Champs incorrect"
      });
    }
    // On demande juste les champs obligatoires à l'inscription
    const organisation = new Organisation({
      nom: req.body.nom,
      raisonSocial: req.body.raisonSocial,
      secteurActivite: req.body.secteurActivite,
      villeSiegeSocial: req.body.villeSiegeSocial,
      codePostalSiegeSocial: req.body.codePostalSiegeSocial,
      paysSiegeSocial: req.body.paysSiegeSocial
    });
    let data = await organisation.save();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

/* Getteur avec paramètres
** Renvoie le nombre d'organisation dans le base de données
** Paramètres :
**  - offset      -> Définit le document à partir duquel on veut les documents
**  - limit       -> Définit le nombre de document que l'on veut recevoir
**  - sortType    -> Type de la valeur que l'on veut trier
**  - sortValue   -> Valeur que l'on veut trier
**  - searchType  -> Type de la valeur à partir de laquel on veut chercher
**  - searchValue -> Valeur à partir de laquel on cherche dans la BBD
**
**  ⚠️ sortType et sortValue doivent être appelé ensemeble
**  ⚠️ searchType et searchValue doivent être appelé ensemble
*/
exports.getOrganisationByParams = async (req, res) => {
  try {
    const count = await Organisation.countDocuments();
    const offset = parseInt(req.body.offset)*10;
    const limit = parseInt(req.body.limit);
    let sortObject = {};
    const sortType = req.body.sortType;
    const sortValue = req.body.sortValue;
    if ((sortType !== undefined) && (sortValue !== undefined)) {
      sortObject[sortType] = sortValue;
    }
    let queryObj = {};
    const searchType = req.body.field;
    const searchValue = req.body.value;
    if ((searchType !== undefined) && (searchValue !== undefined)) {
      queryObj[searchType] = searchValue;
    }
    const rep = await Organisation.find(queryObj).sort(sortObject).skip(offset).limit(limit);
    res.status(201).json({ rep, count })
  } catch (err) {
    res.status(401).json(err)
  }
};

// UPDATE avec nom
exports.updateOrganisation = async (req, res) => {
  try {
    if (controle(req.body) === false) {
      return res.status(409).json({
        message: "Champs incorrect"
      });
    }
    await Organisation.updateOne({ nom: req.body.nom },  req.body )
      .then(response => {
        res.status(201).json(response);
      });
  }catch (err) {
    res.status(400).json({ err: err });
  }
  
};

// DELETE avec nom
exports.deleteOrganisation = async (req, res) => {
  try {
    await Organisation.deleteOne({ nom: req.body.nom });
    res.status(201).json({message: "Suppression réussie !"});
  } catch (err) {
    res.status(401).json({err: err});
  }
};


// Contrôle Champs
controle = (organisation) => {
  if (
    (Constantes.formatIntitulé.test(organisation.nom) === false) || 
    (Constantes.formatNom.test(organisation.villeSiegeSocial) === false) ||
    (Constantes.formatCodePostal.test(organisation.codePostalSiegeSocial) === false) ||
    (Constantes.clésPays.includes(organisation.paysSiegeSocial) === false) ||
    (Constantes.formatNom.test(organisation.secteurActivite) === false)
    ){
      return false;
    }
    console.log(organisation.lienSiteOrganisation)
  if (((organisation.lienSiteOrganisation !== undefined) && ((Constantes.formatLienSite.test(organisation.lienSiteOrganisation) === false))) ||
    ((organisation.lienLinkedin !== undefined) && ((Constantes.formatLienLinkedIn.test(organisation.lienLinkedin) === false)))) {
    return false;
  }
    return true;
};

// Image System
exports.uploadImage = async (req, res) => {
  
};