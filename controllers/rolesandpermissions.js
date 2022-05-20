// const AccessControl = require("accesscontrol");
const  {Role} = require("../models/roles");
const  {Resource} = require("../models/resources");

let { ErrorHandler } = require("../handlers/errorHandler");
let { success } = require("../handlers/responseHandler");


// const ac = new AccessControl();

exports.addRoles = async (req, res) => {
    let role = new Role(req.body)
    try {
        await role.save();
      } catch (err) {
       throw new ErrorHandler(400, err.message);
      }
      return success(200, "success", res);
}

exports.getall = async (req, res) => {
    let roles = await Role.find({});
    return success(200, roles, res);

}

exports.addResource = async (req, res) => {
    let resource = new Resource(req.body);
    console.log(resource)

    try {
        await resource.save();

    } catch (err) {
        throw new ErrorHandler(400, err.message);
    }
      return success(200, "success", res);
}


// exports.changePrivillages = async (req, res) => {
//     const permission = ac.can('user').createOwn('video');
//     // ac.lock().setGrants({}); // throws after locked

// }