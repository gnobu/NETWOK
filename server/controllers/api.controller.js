const User = require('../models/schema/user');
const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('./responseObject');

module.exports.fetchProfile = async (req, res) => {
    const userId = req.userId;
    const { username } = req.params;
    try {
        User.findOne({ username: username }, async function (err, user) {
            if (err) throw new Error('User not found');

            const { password, email, __v, ...otherData } = user.toObject();
            const posts = await PostMessage.find({ author: otherData._id }, 'author content likes likes_count createdAt')
                .populate('author', 'avatar username fullName');

            let action;
            const otherId = otherData._id.toString();
            if (otherId === userId) {
                action = 'Edit';
            } else {
                const currUser = await User.findById(userId, 'connections connect_requests');
                if (!currUser) throw new Error('User not found');

                if (currUser.connect_requests.hasOwnProperty(otherId)) {
                    action = 'Accept';
                } else if (currUser.connections.hasOwnProperty(otherId)) {
                    action = 'Disconnect';
                } else {
                    action = 'Connect';
                }
            }

            otherData.connections = await user.populateConnections();
            otherData.connect_requests = await user.populateRequests();

            res.json(responseObject({ ...otherData, posts, action, auth: true }, true));
            console.log("profile fetched", action);
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

// module.exports.request = async (req, res) => {
//     const userId = req.userId;
//     const otherUser = req.params.userId;
//     try {
//         User.findById(otherUser, (err, user) => {
//             if (err) throw new Error(err.message);

//             const action = user.toggleRequest(userId);
//             user.markModified('connect_requests');
//             user.save();
//             console.log(`action: ${action}`);
//             res.json(responseObject({ action }, true));
//         })
//     } catch (error) {
//         console.log(error);
//         res.json(responseObject(null, false, error.message));
//     }
// }

module.exports.connect = async (req, res) => {
    const userId = req.userId;
    const otherUser = req.params.userId;
    const { action } = req.body;

    if (action === "connect" || action === "requested") {
        try {
            User.findById(otherUser, (err, user) => {
                if (err) throw new Error(err.message);

                const action = user.toggleRequest(userId);
                user.markModified('connect_requests');
                user.save();
                console.log(`action: ${action}`);
                res.json(responseObject({ action }, true));
            })
        } catch (error) {
            console.log(error);
            res.json(responseObject(null, false, error.message));
        }
    } else if (action === "connect" || action === "requested") {
        try {
            User.findById(userId, (err, user) => {
                if (err) throw new Error(err.message);

                const action = user.toggleConnect(otherUser);
                user.save();
            })

            User.findById(otherUser, (err, user) => {
                if (err) throw new Error(err.message);

                const action = user.toggleConnect(userId);
                user.save();

                console.log(`action: ${action}`);
                res.json(responseObject({ action }, true));
            })
        } catch (error) {
            console.log(error);
            res.json(responseObject(null, false, error.message));
        }
    }
}