const express = require("express");
const router = express.Router();
const auth = require("../../../config/auth");
const userController = require("../controller/userController");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image at format .png, .jpg or .jepg'))
    }
    cb(undefined, true)
  }
});

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/nomUtilisateur", userController.getUserbyNomUtilisateur);
router.get("/users/params", userController.getUserByParams); //A FINIR
//router.get("/users", userController.getAllUsers);
//router.get("/users/etudiant", userController.getAllEtudiant);

// Image
router.post('/upload', upload.single('upload'), userController.uploadImage);
router.get("/image", userController.getImage)


router.put("/:nomUtilisateur", userController.updateUser);




// For Admin
router.put("/valide", userController.updateValidation);
router.post("/delete", userController.deleteUser);

module.exports = router;
