
const users = require("../routes/user");
const posts = require('../routes/post')
const roles = require('../routes/roles')

module.exports = function (app, next) {
  app.use("/api/users", users);
  app.use("/api/posts", posts);
  app.use("/api/roles", roles);
};


