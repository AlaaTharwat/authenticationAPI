let  { Post , validatePost } =  require("../models/post");

let {success} = require('../handlers/responseHandler');
let { ErrorHandler } = require("../handlers/errorHandler");


exports.createPost = async (req, res) => {
    let userID = req.user.id;
    const { error } = validatePost(req.body);
    if (error)  throw new ErrorHandler(400, error);

    let post = new Post(req.body);
    post.user = userID;

    try{
        await post.save()
    }catch(err){
        throw new ErrorHandler(500, err);
    }
    return success(201, "Created successfully", res);
}

exports.getallPosts= async (req, res) => {
    let posts = await Post.find({isDeleted: false});
    return success(200, posts, res);
}

exports.getPost = async (req, res) => {
    let postId = req.params.id;
    let post = await Post.findOne({_id: postId, isDeleted: false});

    if(!post)  throw new ErrorHandler(404, "post not found");
    post.user = undefined;
    return success(200, post, res);
}

exports.deletePost = async (req, res) => {
    let postId = req.params.id;
    console.log(postId)
    let post = await Post.findOne({_id: postId, isDeleted: false});

    if(!post)  throw new ErrorHandler(404, "post not found");
    post.isDeleted = true;

    return success(200, "Deleted successfully", res);
}