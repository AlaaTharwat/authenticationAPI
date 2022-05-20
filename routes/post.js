const express = require("express");
const router = express.Router();

const postController = require('../controllers/post')

const authMW = require('../middlewares/authMW');
const usePermissionsMiddleware = require('../middlewares/usePermissionsMW');


router.post('/addpost', authMW, usePermissionsMiddleware("post", "create"),postController.createPost);
router.get('/', authMW, usePermissionsMiddleware("post", "read"),postController.getallPosts);
router.delete('/:id', authMW, usePermissionsMiddleware('post', 'delete'), postController.deletePost);
router.get('/:id', authMW, usePermissionsMiddleware("post", "read"),postController.getPost);



module.exports = router;


