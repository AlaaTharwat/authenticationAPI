const { User } = require('../models/user');
const bcrypt = require("bcryptjs");

require("dotenv").config();

let { ErrorHandler } = require("../handlers/errorHandler");
let { success } = require("../handlers/responseHandler");

exports.authenticateUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new ErrorHandler(400, "Wrong Email or password");
  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) throw new ErrorHandler(400, "Wrong Email or password");
  
    const token = user.generateToken(process.env.jwtExpiration);
    const refreshToken = user.generateToken(process.env.jwtRefreshExpiration); 

    user.isLoggedOut = false;

    user.password = undefined;
    let userData = {
        token: token,
        refreshToken: refreshToken,
        user: user
    }
    
    return success(200, userData, res);
  }

  exports.getUserLoggedOut =  async (req, res) => {
      let user =  req.user;
      user.isLoggedOut = true;
      return success(200, "User logged out successfully", res);
  }