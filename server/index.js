const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const path = require('path')
// Manipulation de fichier


const app = express();

//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, 
    { useNewUrlParser: true,
      useUnifiedTopology: true})
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

// pr les warning 304 avec get : cache
app.disable("etag");
//registering cors

app.use(cors());


//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan("dev")); // configire morgan

// 
app.use('/images', express.static(path.join(__dirname, 'images')));
// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});

const userRoutes = require("./api/user/routes/user"); //bring in our user routes
app.use("/user", userRoutes);

const etablissementRoutes = require("./api/user/routes/etablissement");
app.use("/etablissement", etablissementRoutes);

const inscriptionRoutes = require("./api/user/routes/inscription");
app.use("/inscription", inscriptionRoutes);

const formationRoutes = require("./api/user/routes/formation");
app.use("/formation", formationRoutes);

const organisationRoutes = require("./api/user/routes/organisation.routes");
app.use("/organisation", organisationRoutes);

const forumRoutes = require("./api/user/routes/forum");
app.use("/forum",forumRoutes);

const serviceRoutes = require("./api/user/routes/service.routes");
app.use("/service", serviceRoutes);


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
