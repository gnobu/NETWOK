const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('../helpers/responseObject');

module.exports.createPost = async (userId, content, res) => {
    const newPost = new PostMessage({ author: userId, content });
    await newPost.save();
    res.status(201).json(responseObject({ message: 'New post created' }, true));
}

module.exports.likePost = async (postId, userId, res) => {
    const post = await PostMessage.findById(postId);
    if (!post) return res.status(404).json(responseObject(null, false, 'Post no longer accessible'));

    const message = post.toggleLike(userId);
    res.status(200).json(responseObject({ message }, true));
}