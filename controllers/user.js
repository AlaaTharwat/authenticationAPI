let  {User, validateUser} =  require("../models/user");

const bcrypt = require("bcryptjs");

let {success} = require('../handlers/responseHandler');
let { ErrorHandler } = require("../handlers/errorHandler");


exports.createUser = async(req, res) => {
  const { error } = validateUser(req.body);
  if (error)  throw new ErrorHandler(400, error);

  let user = await User.findOne({ email: req.body.email });
  if (user)  throw new ErrorHandler(400, "User already exists");
  user = new User(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  try {
    await user.save();
  } catch (err) {
    throw new ErrorHandler(500, err);
  }
  return success(201, "Created successfully", res)
}


exports.assignRoleToUser = async (req, res) => {
  let userID = req.body.id;
  let role = req.body.role;

  let user = await User.findOne({ _id: userID });
  if (!user)  throw new ErrorHandler(400, "User not found");
  try {
    user.role = role
    await user.save();
  } catch (err) {
    throw new ErrorHandler(500, "You shoud choose correct role");
  }
  return success(201, "updated successfully", res)

}



