const User = require('../models/schema/user');
const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('./responseObject');

module.exports.fetchProfile = async (req, res) => {
    const userId = req.userId;
    const { username } = req.params;
    try {
        const currUser = await User.findById(userId, 'connections connect_requests');
        if (!currUser) throw new Error('Current user not found');

        User.findOne({ username: username }, async (err, user) => {
            if (err) throw new Error('User not found');

            const { password, email, __v, ...otherData } = user.toObject();
            const posts = await PostMessage.find({ author: otherData._id }, 'author content likes likes_count createdAt')
                .populate('author', 'avatar username fullName');

            const otherId = otherData._id.toString();
            if (otherId === userId) {
                otherData.action = 'Edit';
            } else {
                currUser.getAction(otherId, otherData);
            }

            otherData.connections = await user.populateConnections(currUser);
            otherData.connect_requests = await user.populateRequests(currUser);

            res.json(responseObject({ ...otherData, posts, auth: true }, true));
            console.log("profile fetched");
        });
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}

module.exports.search = async (req, res) => {
    const userId = req.userId;
    const { filter, content } = req.body;
    try {
        if (filter === 'username') {
            const re = new RegExp(`${content}`, 'i')
            const currUser = await User.findById(userId, 'connections connect_requests');
            User.find({ username: re }, 'avatar fullName username skills', (err, result) => {
                if (err) throw new Error(err.message);

                const resolved = result.map((obj) => {
                    obj = obj.toObject();
                    const otherId = obj._id.toString();
                    if (otherId === userId) {
                        obj.action = null;
                    } else {
                        currUser.getAction(otherId, obj);
                    }
                    return obj;
                });
                res.json(responseObject(resolved, true, null));
                console.log('user searched');
            });
        } else if (filter === "skill") {
            console.log('skill searched');
            res.json(responseObject([], true, null));
        }
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}

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