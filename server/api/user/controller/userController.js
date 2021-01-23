const { response } = require("express");
const User = require("../model/User");

// CREATE
exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ nomUtilisateur: req.body.nomUtilisateur });
    console.log(isUser);
    if (isUser.length >= 1) {
      return res.status(409).json({
        message: "nomUtilisateur already in use"
      });
    }
    const user = new User({
      civilite: req.body.civilite,
      prenom: req.body.prenom,
      nom: req.body.nom,
      dateNaissance: req.body.dateNaissance,
      statut: req.body.statut,
      nomUtilisateur: req.body.nomUtilisateur,
      email: req.body.email,
      password: req.body.password
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
//       GET
exports.loginUser = async (req, res) => {
  try {
    const nomUtilisateur = req.body.nomUtilisateur;
    const password = req.body.password;
    const user = await User.findByCredentials(nomUtilisateur, password);
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    if (!user.valide) {
      return res
        .status(401)
        .json({ error: "Compte non validé !" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(201).json({ users });
};
// Annuaire
// exports.getAllEtudiant = async (req, res) => {
//   const count = await User.count();
//   const offset = parseInt(req.query.offset)*10;
//   const rep = await User.find({ $or: [{ statut: "Etudiant" }, { statut: "Professeur" }] }).skip(offset).limit(10);
//   res.status(201).json({ rep, count });
// };
exports.getUserbyNomUtilisateur = async (req, res) => {
  try {
    const user = await User.findOne({ nomUtilisateur: req.query.nomUtilisateur });
    res.status(201).json({ user });
  } catch (err) {
    res.status(401).json({ err });
  }
};
exports.getUserByParams = async (req, res) => {
  try {
    const count = await User.countDocuments();
    const offset = parseInt(req.query.offset)*10;
    const limit = parseInt(req.query.limit);
    var sortObject = {};
    const sortType = req.query.sortType;
    const sortValue = req.query.sortValue;
    sortObject[sortType] = sortValue;
    console.log(sortObject);
    // const { search_field, search_value } = req.query.filtre;
    // const queryObj = {};
    // if (search_field !== '' && search_value !== '') {
    //   queryObj[search_field] = search_value;
    // }
    // console.log('::queryObj::', queryObj); { $or: [filtre] }
    const rep = await User.find().sort(sortObject).skip(offset).limit(limit);
    res.status(201).json({ rep, count })
  } catch (err) {
    res.status(401).json(err)
  }
  

};
//    UPDATE
exports.updateUser = async (req, res) => {
  try {
    await User.updateOne({ nomUtilisateur: req.body.nomUtilisateur },  req.body )
      .then(response => {
        res.status(201).json(response);
      });
  }catch (err) {
    res.status(400).json({ err: err });
  }
  
};
// Update User Validation Admin
exports.updateValidation = async (req, res) => {
  try {
    const user = await User.findOne({ nomUtilisateur: req.body.nomUtilisateur });
    if (user) {
      user.valide = !user.valide;
      user.save()
    }
    res.status(201).json({message: "Validation mise à jour !"});
  }catch (err){
      res.status(401).json({err: err});
  }
};


//    DELETE
// Delete User Admin
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ nomUtilisateur: req.body.nomUtilisateur });
    res.status(201).json({message: "Suppression réussie !"});
  } catch (err) {
    res.status(401).json({err: err});
  }
};


// IMAGE
// Upload Image from User
exports.uploadImage = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    // //console.log(req.file);
    // console.log(user.imageProfil)
    user.imageProfil = req.file.buffer;
    // console.log("YO");
    user.save();
    res.send({ message: "Check"})
  } catch (err) {
    res.status(400).send(err)
  }
};

// Get Image from UserBase
exports.getImage = async (req, res) => {
  try {
    console.log(req.query.nomUtilisateur)
    const user = await User.findOne({ nomUtilisateur: req.query.nomUtilisateur });
    if (!user || !user.imageProfil) {
      throw new Error("Pas d'image")
    }
    
    res.set('Content-Type', 'image/png')
    let image = user.imageProfil
    res.send({ image })
  } catch (err) {
    res.status(404).send()
  }
}
// Delete Image in UserBase
exports.deleteImage = async (req, res) => {
  try {
    const user = await User.findById(req.body.id)
    user.imageProfil = undefined
    user.save()
    res.send({ message: "Check"})
  } catch (err) {
    res.status(400).send(err)
  }
};
