const mongoose = require("mongoose");

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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  formationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formation',
    required: true
  },
  etablissementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etablissement',
    required: true
  },
  infoSupp: {
    type: String,
    default: null
  }
});

const Inscription = mongoose.model("Inscription", inscriptionSchema);
module.exports = Inscription;