const mongoose = require("mongoose");

const formationSchema = mongoose.Schema({
  intitulé_formation_court: {
    type: String,
    required: true
  },
  intitulé_formation_long: {
    type: String,
    required: true,
    unique: true
  }
});

const Formation = mongoose.model("Formation", formationSchema);
module.exports = Formation;