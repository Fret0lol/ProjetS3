const mongoose = require("mongoose");

const sujetSchema = mongoose.Schema({
  titreSujet : {
    type : String,
    required : true,
    unique : true
  },
  descriptionSujet : {
      type : String,
      required : true
  },
  dateSujet : {
      type : Date,
      required : true
  },
  illustrationSujet : {
      type : Image,
      required : true
  },
  statutSujet : {
      type : String,
      required : true
  }
});

const Sujet = mongoose.model("Sujet", sujetSchema);
module.exports = Sujet;