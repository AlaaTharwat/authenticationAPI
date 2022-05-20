const express = require("express");
const router = express.Router();

const authMW = require("../middlewares/authMW");
const usePermissionsMiddleware = require('../middlewares/usePermissionsMW')

const userAccessController = require("../controllers/rolesandpermissions")

router.post('/addRole' ,authMW, usePermissionsMiddleware("role", "read"),userAccessController.addRoles);
router.post('/addResource',authMW,usePermissionsMiddleware("role", "read"), userAccessController.addResource);

router.get('/' ,userAccessController.getall);


module.exports = router;
