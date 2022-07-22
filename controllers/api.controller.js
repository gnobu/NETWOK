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

            const { password, email, __v, ...profileData } = user.toObject();
            let posts = await PostMessage.find({ author: profileData._id }, 'author content likes likes_count createdAt')
                .populate('author', 'avatar username fullName');

            posts = posts.map(post => {
                post._doc.liked = post.isLiked(userId);
                return post;
            })

            const otherId = profileData._id.toString();
            if (otherId === userId) {
                profileData.action = 'Edit';
            } else if (profileData.connect_requests.hasOwnProperty(userId)) {
                profileData.action = 'Requested';
            } else {
                currUser.getAction(otherId, profileData);
            }

            profileData.connections = await user.populateConnections(currUser);
            profileData.connect_requests = await user.populateRequests(currUser);

            res.json(responseObject({ ...profileData, posts, auth: true }, true));
            console.log("profile fetched");
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(responseObject({ auth: false }, false));
    }
}

module.exports.search = async (req, res) => {
    const userId = req.userId;
    const { filter, content } = req.body;
    try {
        if (filter === 'username') {
            const re = new RegExp(`${content}`, 'i')
            const currUser = await User.findById(userId, 'connections connect_requests');
            User.find({ username: re }, 'avatar fullName username skills connect_requests', (err, result) => {
                if (err) throw new Error(err.message);

                const resolved = result.map((obj) => {
                    obj = obj.toObject();
                    const otherId = obj._id.toString();
                    if (otherId === userId) {
                        obj.action = null;
                    } else if (obj.connect_requests.hasOwnProperty(userId)) {
                        obj.action = 'Requested';
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

    if (action === "Connect" || action === "Requested") {
        try {
            User.findById(otherUser, async (err, user) => {
                if (err) throw new Error(err.message);

                const newAction = user.toggleRequest(userId);
                await user.save();

                console.log(`action: ${newAction}`);
                res.json(responseObject({ action: newAction }, true));
            })
        } catch (error) {
            console.log(error);
            res.json(responseObject(null, false, error.message));
        }
    } else if (action === "Accept" || action === "Disconnect") {
        try {
            User.findById(otherUser, async (err, user) => {
                if (err) throw new Error(err.message);

                user.toggleConnect(userId);
                await user.save();
            })

            User.findById(userId, async (err, user) => {
                if (err) throw new Error(err.message);

                const newAction = user.toggleConnect(otherUser);
                await user.save();

                console.log(`action: ${newAction}`);
                res.json(responseObject({ action: newAction }, true));
            })
        } catch (error) {
            console.log(error);
            res.json(responseObject(null, false, error.message));
        }
    }
}



module.exports.fetchTimeline = async (req, res) => {
    const userId = req.userId;
    let idsArray = [userId];
    try {
        const { connections } = await User.findById(userId, 'connections');
        Object.keys(connections).forEach(connection => {
            if (connection != 'empty') {
                idsArray.push(connection);
            }
        })

        const resolved = await Promise.all(idsArray.map(async (person) => {

            let posts = await PostMessage.find({ author: person }, 'author content likes likes_count createdAt')
                .populate('author', 'avatar username fullName');

            posts = posts.map(post => {
                post._doc.liked = post.isLiked(userId);
                return post;
            })

            return posts;
        }))

        const timeline = [];
        resolved.forEach(arr => {
            timeline.push(...arr);
        })

        res.json(responseObject({ timeline }, true));
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}