const express = require("express");
const router = express.Router();


const authMW = require('../middlewares/authMW');
const usePermissionsMiddleware = require('../middlewares/usePermissionsMW');

const userController = require('../controllers/user');
const authController = require('../controllers/authentication');


router.post('/register', userController.createUser);
router.post('/login', authController.authenticateUser);
router.post('/logout', authMW,authController.getUserLoggedOut);

router.put('/assignRole', authMW, usePermissionsMiddleware ("user", "update"), userController.assignRoleToUser);


module.exports = router;


