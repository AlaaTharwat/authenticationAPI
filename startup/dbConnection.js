const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  mongoose
    // mongodb://mongo:27017/authapp => to run with docker 
    .connect("mongodb://localhost:27017/authapp")
    .then(() => winston.info("connected to db "), console.log("Connection to database!"))
    .catch(e => console.log(e));
};
