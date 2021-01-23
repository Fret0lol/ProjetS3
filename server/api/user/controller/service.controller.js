const { response } = require("express");
const Service = require("../model/Service.model");
const Organisation = require("../model/Organisation.model");
const User = require("../model/User");
const Constantes = require("../../../config/controleChamps");

// CREATE
exports.registerNewService = async (req, res) => {
  try {
    // Contrôle des champs envoyés
    if (controle(req.body) === false) {
      return res.status(409).json({
        message: "Champs incorrect",
      });
    }
    // Récupération de l'organisation
    let isOrganisation = await Organisation.find({
      nom: req.body.nomOrganisation,
    });
    if (isOrganisation.length < 1) {
      return res.status(409).json({
        message: "Organisation non-répertorié dans notre base de données",
      });
    }
    let _idOrganisation = isOrganisation[0]._id;
    console.log(typeof _idOrganisation)
    // // Test si service
    let isService = await Service.find({ nom: req.body.nom, organisation: _idOrganisation });

    // Test utilisateur déjà existant
    let isUser = await User.find({ nomUtilisateur: req.body.nomUtilisateur });
    if (isUser.length < 1) {
      return res.status(409).json({
        message: "Utilisateur non-répertorié dans notre base de données",
      });
    }
    // // Si le service existe déjà on ajoute juste un membres à sa liste de salarié
    if (isService.length >= 1) {
      
      // Test si le membre est déjà présent dans le service
      let _id = isUser[0]._id;
      isService[0].membres.forEach((membre) => {
        if (JSON.stringify(membre) === JSON.stringify(_id)) {
          res.status(409).json({ message: "Utilisateur déjà présent dans le service" });
          throw err;
        }
      });
      isService[0].membres.push({ _id });
      let data = await isService[0].save();
      res.status(201).json({ data });
    
    }
    // Service Non-existant
    // On demande juste les champs obligatoires à l'inscription
    const service = new Service({
      nom: req.body.nom,
      ville: req.body.ville,
      codePostal: req.body.codePostal,
      pays: req.body.pays,
      organisation: isOrganisation[0]._id,
    });
    let _id = isUser[0]._id;
    service.membres.push({ _id });

    let data = await service.save();
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
exports.getServiceByParams = async (req, res) => {
  try {
    const count = await Service.countDocuments();
    const offset = parseInt(req.body.offset) * 10;
    const limit = parseInt(req.body.limit);
    let sortObject = {};
    const sortType = req.body.sortType;
    const sortValue = req.body.sortValue;
    if (sortType !== undefined && sortValue !== undefined) {
      sortObject[sortType] = sortValue;
    }
    let queryObj = {};
    const searchType = req.body.field;
    const searchValue = req.body.value;
    if (searchType !== undefined && searchValue !== undefined) {
      queryObj[searchType] = searchValue;
    }
    const rep = await Service.find(queryObj)
      .sort(sortObject)
      .skip(offset)
      .limit(limit)
      .populate([{ path: "organisation", select: "nom" }]);
    res.status(201).json({ rep, count });
  } catch (err) {
    res.status(401).json(err);
  }
};

// // UPDATE avec nom
// exports.updateOrganisation = async (req, res) => {
//   try {
//     if (controle(req.body) === false) {
//       return res.status(409).json({
//         message: "Champs incorrect",
//       });
//     }
//     await Organisation.updateOne({ nom: req.body.nom }, req.body).then(
//       (response) => {
//         res.status(201).json(response);
//       }
//     );
//   } catch (err) {
//     res.status(400).json({ err: err });
//   }
// };

// DELETE avec nom
exports.deleteService = async (req, res) => {
  try {
    await Service.deleteOne({ nom: req.body.nom });
    res.status(201).json({ message: "Suppression réussie !" });
  } catch (err) {
    res.status(401).json({ err: err });
  }
};

// Contrôle Champs
controle = (service) => {
  if (
    Constantes.formatNom.test(service.nom) === false ||
    Constantes.formatNom.test(service.ville) === false ||
    Constantes.formatCodePostal.test(service.codePostal) ===
      false ||
    Constantes.clésPays.includes(service.pays) === false
  ) {
    return false;
  }
  
  return true;
};

// Image System
exports.uploadImage = async (req, res) => {};
