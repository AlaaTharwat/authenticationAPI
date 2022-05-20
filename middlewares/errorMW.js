const winston = require("winston");
let {handleError} =  require("../handlers/errorHandler");

module.exports = function (error, req, res, next) {
  winston.info(`Request: ${new Date().toISOString()}: ${JSON.stringify(req.body)}`);
  winston.error(error.message, error);
  handleError(error, res);
};