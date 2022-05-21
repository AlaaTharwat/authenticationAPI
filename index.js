const express = require("express");
const winston = require("winston");

const ErrorMW = require("./middlewares/errorMW");
const allowCORSMW = require("./middlewares/CORSMW");

const {seedRoles, seedResource, seedAdminUser} = require('./startup/seeder');


require("./log/logging")();
require("./startup/dbConnection")();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(allowCORSMW);

 seedRoles();
 seedResource();
 seedAdminUser();

app.get("/", (req, res) => {
  res.send("Luka_Modric_10");
});

require("./startup/routes")(app);

app.use(ErrorMW);

app.listen(7500);