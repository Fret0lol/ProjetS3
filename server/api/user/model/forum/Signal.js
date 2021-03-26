const mongoose = require("mongoose");


const signalSchema = mongoose.Schema({
  motif : {
      type : String,
      required : true
  },
  postID : {
      type : String,
      required : true
  },
  content : {
    type: String,
    required : true
  }
});

const Signal = mongoose.model("Signal", signalSchema);
module.exports = Signal;