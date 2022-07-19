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