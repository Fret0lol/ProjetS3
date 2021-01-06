const mongoose = require("mongoose");

const etablissementSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  ville: {
    type: String,
    required: true
  },
  codePostal: {
    type: String,
    required: true
  },
  pays: {
    type: String,
    required: true
  }
});

const Etablissement = mongoose.model("Etablissement", etablissementSchema);
module.exports = Etablissement;