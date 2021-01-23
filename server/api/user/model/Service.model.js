const mongoose = require("mongoose");
const Organisation = require("./Organisation.model");
const Membres = require("./User");

const serviceSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  },
  codePostal: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: true,
  },
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Organisation,
  },
  membres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Membres,
    },
  ],
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
