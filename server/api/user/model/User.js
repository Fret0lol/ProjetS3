const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// « jà » est un mot d’ancien français signifiant « l’instant présent »
const jà = new Date(),
	limiteAntérieureNaissance = new Date(),
	limitePostérieureNaissance = new Date()

// Les limites dans les quelles on considère qu’une personne peut être née
limiteAntérieureNaissance.setYear(jà.getFullYear() - 100)
limitePostérieureNaissance.setYear(jà.getFullYear() - 15)

const userSchema = mongoose.Schema({
  valide: {
    type: Boolean,
    default: false
  },
  civilite: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: [true, "Veuillez saisir un prénom !"]
  },
  nom: {
    type: String,
    required: [true, "Veuillez saisir un nom !"]
  },
  dateNaissance: {
    type: Date,
    min: limiteAntérieureNaissance,
    max: limitePostérieureNaissance,
    required: true
  },
  statut: {
    type: String,
    required: true
  },
  nomUtilisateur: {
    type: String,
    required: [true, "Veuillez saisir un nom !"]
  },
  email: {
    type: String,
    required: [true, "Veuillez saisir un email !"]
  },
  password: {
    type: String,
    required: [true, "Veuillez saisir un mot de passe"]
  },
  // traitementDonneePerso: {
  //   type: Boolean,
  //   required: true
  // },
  // traitementDonneePro: {
  //   type: Boolean,
  //   required: true
  // },
  dateInscription: {
    type: Date,
    default: Date.now()
  },
  linkedin: {
    type: String,
    default: null
  },
  sitePersonnel: {
    type: String,
    default: null
  },
  numeroTelephone: {
    type: String,
    default: null
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this function generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, nomUtilisateur: user.nomUtilisateur, email: user.email, statut: user.statut },
    "secret"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (nomUtilisateur, password) => {
  const user = await User.findOne({ nomUtilisateur });
  console.log(user);
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
