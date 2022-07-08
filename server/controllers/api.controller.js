const User = require('../models/schema/user');
const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('./responseObject');

module.exports.fetchProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const data = await User.findOne({ username });
        if (!data) throw new Error('User not found');

        const { password, email, __v, ...otherData } = data.toObject();
        const posts = await PostMessage.find({ author: otherData._id }, '_id author content likes createdAt').populate('author', 'avatar username fullName');
        // console.log(posts);
        res.json(responseObject({ ...otherData, posts, auth: true }, true));
        console.log("profile fetched");
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}

module.exports.search = async (req, res) => {
    const { filter, content } = req.body;
    try {
        if (filter === 'username') {
            const re = new RegExp(`${content}`, 'i')
            const result = await User.find({ username: re }).select('avatar fullName username skills');
            console.log('user searched');
            res.json(responseObject(result, true, null));
        } else if (filter === "skill") {
            console.log('skill searched');
            res.json(responseObject([], true, null));

        }
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}