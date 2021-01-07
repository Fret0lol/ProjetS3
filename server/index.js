const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

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

//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(morgan("dev")); // configire morgan

// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});

const userRoutes = require("./api/user/route/user"); //bring in our user routes
app.use("/user", userRoutes);

const etablissementRoutes = require("./api/user/route/etablissement");
app.use("/etablissement", etablissementRoutes);

const inscriptionRoutes = require("./api/user/route/inscription");
app.use("/inscription", inscriptionRoutes);

const formationRoutes = require("./api/user/route/formation");
app.use("/formation", formationRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
