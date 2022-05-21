const mongoose = require("mongoose");
const Joi = require("joi");


const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isDeleted: {
        Type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
}, {
    timestamps: true
});

const Post = mongoose.model("posts", postSchema);

function validatePost(post) {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        content: Joi.string().max(2000).required(),
    }).options({ abortEarly: false });

    return schema.validate(post);
}
exports.Post = Post;
exports.validatePost = validatePost





