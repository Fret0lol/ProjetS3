const multer = require("multer");
const path = require('path')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
/* 
  Définition de l'emplacement des fichiers dans le dossier 'image'
  Définition du nom du fichier par la date actuel en milliseconde + l'extension de base
*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports  = multer({ storage: storage }).any('image');
