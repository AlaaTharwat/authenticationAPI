const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { string, boolean } = require("joi");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    minlength: 5,
    maxlength: 255,
    match:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 1024,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
    minlength: 11,
    maxlength: 11,
  },
  isLoggedOut: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    ref: "roles",
    enum: ["admin", "user", "basic"],
    default: "basic"
  }
},{
  timestamps: true
});

userSchema.methods.generateToken = function (ExpirationDate) {
  const token = jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.AUTH_APP_KEY,
    {
      expiresIn: ExpirationDate * 60 * 3600,
    }
  );
  return token;
};

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("user", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    phone: Joi.string().max(11).min(11).required(),
    // role: Joi.string()
   
  }).options({ abortEarly: false });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;