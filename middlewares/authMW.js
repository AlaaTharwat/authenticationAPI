const jwt = require("jsonwebtoken");
require("dotenv").config();

let { ErrorHandler } = require("../handlers/errorHandler");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) throw new ErrorHandler(401, "Access denied");

  try {
    const decodedPayLoad = jwt.verify(token, process.env.AUTH_APP_KEY);
    req.user = decodedPayLoad;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ErrorHandler(401, "Token Expired");
    }
    throw new ErrorHandler(401, "Invalid token");
  }
}

module.exports = auth;
