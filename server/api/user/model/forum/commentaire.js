const mongoose = require("mongoose");
const Sujet = require('../forum/Sujet');

const commentaireschema = mongoose.Schema({
    auteurCommentaire : {
        type : String,
        required : true
    },
    dateCommentaire : {
        type : Date,
        required : true
    },
    contenuCommentaire : {
        type : String,
        required : true
    },
    sujetRef : {
        type: mongoose.Schema.Types.ObjectId, ref: 'Sujet'
    }
});