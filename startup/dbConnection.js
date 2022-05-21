const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  mongoose
    // mongodb://localhost:27017/authapp => to run without docker containers
    .connect("mongodb://localhost:27017/authapp")
    .then(() => winston.info("connected to db "), console.log("Connection to database!"))
    .catch(e => console.log(e));
};
