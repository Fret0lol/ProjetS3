const mongoose = require("mongoose");
const User = require("../model/User");

const inscriptionSchema = mongoose.Schema({
  date_entrée: {
    type: Date,
    required: true
  },
  date_sortie: {
    type: Date,
    required: true
  },
  utilisateurId: {
    type: mongoose.Schema.ObjectId,
    ref: User
  },
  formationId: {
    type: mongoose.Schema.ObjectId,
    ref: "Formation"
  },
  etablissementId: {
    type: mongoose.Schema.ObjectId,
    ref: "Etablissement"
  }
});

const Inscription = mongoose.model("Inscription", inscriptionSchema);
module.exports = Inscription;