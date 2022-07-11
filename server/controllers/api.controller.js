const User = require('../models/schema/user');
const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('./responseObject');

module.exports.fetchProfile = async (req, res) => {
    const { username } = req.params;
    try {
        User.findOne({ username: username }, async function (err, user) {
            if (err) throw new Error('User not found');
            
            user.connections = await user.populateConnections();
            user.connect_requests = await user.populateRequests();

            const { password, email, __v, ...otherData } = user.toObject();
            const posts = await PostMessage.find({ author: otherData._id }, 'author content likes likes_count createdAt')
            .populate('author', 'avatar username fullName');
    
            res.json(responseObject({ ...otherData, posts, auth: true }, true));
            console.log("profile fetched");
        });
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

module.exports.request = async (req, res) => {
    const userId = req.userId;
    const otherUser = req.params.userId;
    try {
        User.findById(otherUser, (err, user) => {
            if (err) throw new Error(err.message);

            const connected = user.toggleRequest(userId);
            user.markModified('connect_requests');
            user.save();
            console.log(`connected: ${connected}`);
            res.json(responseObject({ connected }, true));
        })
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}

module.exports.connect = async (req, res) => {
    const userId = req.userId;
    const otherUser = req.params.userId;
    try {
        User.findById(userId, (err, user) => {
            if (err) throw new Error(err.message);

            const connected = user.toggleConnect(otherUser);
            user.save();
        })
        
        User.findById(otherUser, (err, user) => {
            if (err) throw new Error(err.message);

            const connected = user.toggleConnect(userId);
            user.save();

            console.log(`connected: ${connected}`);
            res.json(responseObject({ connected }, true));
        })
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}