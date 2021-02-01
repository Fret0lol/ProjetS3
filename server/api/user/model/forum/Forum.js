const mongoose = require("mongoose");

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
      type : Image,
      required : true
  },
  typeForum : {
      type : String,
      required : true,
  },
  statutForum : {
      type : String,
      required : true
  }
});

const Forum = mongoose.model("Forum", forumSchema);
module.exports = Forum;