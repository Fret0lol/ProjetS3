const mongoose = require("mongoose");
const Sujet = require('../forum/Sujet');
const forumSchema = mongoose.Schema({
  titreForum : {
    type : String,
    required : true,
    unique : true
  },
  descriptionForum : {
      type : String,
      required : true
  },
  dateForum : {
      type : Date,
      required : true
  },
  illustrationForum : {
      type : String,
      required : true
  },
  typeForum : {
      type : String,
      required : true,
  },
  auteurForum : {
      type : String,
      required : true
  },

});

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;