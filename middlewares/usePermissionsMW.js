const { User } = require("../models/user");
const { Resource } = require("../models/resources");


let { ErrorHandler } = require("../handlers/errorHandler");

module.exports = function usePermissionsMiddleware(resourceValue, method) {

  return async (req, res, next) => {
    // console.log(req.user)
    // const user = req.user;
    const user = await User.findOne({ _id: req.user.id });
    if(!user) throw new ErrorHandler(404, "user not exists");
    if(user.isLoggedOut) throw new ErrorHandler(404, "This session is Expired");

    const privillages = await Resource.findOne({ name: resourceValue })
    let resource_privillage = privillages?.resources_roles.find(role => role.role_name == user.role);
    if(!resource_privillage && user.role != 'admin') throw new ErrorHandler(401, "You don't have this privilege.")
    if (resource_privillage?.[method] || user.role == 'admin') next();
    else throw new ErrorHandler(401, "You don't have this privilege.")
  }
}


