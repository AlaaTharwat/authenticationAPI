const express = require("express");
const winston = require("winston");

const ErrorMW = require("./middlewares/errorMW");
const allowCORSMW = require("./middlewares/CORSMW");


require("./log/logging")();
require("./startup/dbConnection")();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(allowCORSMW);

app.get("/", (req, res) => {
  res.send("Luka_Modric_10");
});

require("./startup/routes")(app);

app.use(ErrorMW);

app.listen(7500);