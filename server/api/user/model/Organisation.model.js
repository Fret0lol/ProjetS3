const mongoose = require('mongoose');

const organisationSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  raisonSocial: {
    type: String,
    required: true
  },
  effectif: {
    type: Number,
    default: null
  },
  secteurActivite: {
    type: String,
    required: true
  },
  villeSiegeSocial: {
    type: String,
    required: true
  },
  paysSiegeSocial: {
    type: String,
    required: true
  },
  codePostalSiegeSocial: {
    type: String,
    required: true
  },
  logoOrganisation: {
    type: String,
    default: null
  },
  lienSiteOrganisation: {
    type: String,
    default: null
  },
  lienLinkedin: {
    type: String,
    default: null
  }
});

const Organisation = mongoose.model("Organisation", organisationSchema);
module.exports = Organisation;