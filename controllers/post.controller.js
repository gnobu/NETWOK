const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('../controllers/responseObject');

module.exports.createPost = async (userId, content, res) => {
    const newPost = new PostMessage({ author: userId, content });
    try {
        await newPost.save();
        res.status(201).json(responseObject({ message: 'New post created' }, true));
    } catch (error) {
        console.log(error);
    }
}

module.exports.likePost = async (postId, userId, res) => {
    try {
        PostMessage.findById(postId, (err, post) => {
            if (err) throw new Error(err);

            const message = post.toggleLike(userId);
            console.log(message);
            res.status(201).json(responseObject({ message }, true));
        });
    } catch (error) {
        console.log(error);
    }
}