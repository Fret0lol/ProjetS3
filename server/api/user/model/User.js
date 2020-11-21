const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    required: true
  },
  dateNaissance: {
    type: String,
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
  dateInscription: {
    type: Date,
    default: Date.now()
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
    { _id: user._id, nomUtilisateur: user.nomUtilisateur, email: user.email },
    "secret"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
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
