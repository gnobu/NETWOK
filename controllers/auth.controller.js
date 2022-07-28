const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

const User = require('../models/schema/user');
const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('./responseObject');




const getUserByUsername = async (username) => {
    const found = await User.findOne({ username });
    if (!found) return false;
    return found.toObject();
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: maxAge })
}




module.exports.checkUser = async (req, res) => {
    const { username } = req.body;
    try {
        const found = await getUserByUsername(username);
        if (found) {
            res.json(responseObject({ found: Boolean(found), message: "Enter your password to login." }, true));
        } else {
            res.json(responseObject({ found: Boolean(found), message: "Username not found. Please sign up." }, true));
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(responseObject(null, false, error.message));
    }
}

module.exports.createUser = async (req, res) => {
    const data = req.body;
    try {
        const otherUser = await getUserByUsername(data.username);
        if (otherUser) {
            console.log('user already exists');
            return res.status(400).json(responseObject(null, false, 'User already exists'));
        }

        const newUser = new User(data); // creating mongoose document

        const salt = await bcrypt.genSalt(10); // generating salt to hash password

        newUser.password = await bcrypt.hash(newUser.password, salt); // set password to hashed password

        newUser.markModified('connections'); // ensure connections is saved

        //save the user and create three posts for them
        newUser.save((err) => {
            if (err) { throw new Error(err.message) }

            const post1 = new PostMessage({
                author: newUser._id,
                content: `Hello world, I'm ${newUser.fullName}. I just joined this platform and this is my first post.`
            });
            post1.save();

            const post2 = new PostMessage({
                author: newUser._id,
                content: `Looking for collaborators on a project. message me if interested.`
            });
            setTimeout(() => post2.save(), 1000 * 60);


            const post3 = new PostMessage({
                author: newUser._id,
                content: `Bagged my first job today. Congrats to me!`
            });
            setTimeout(() => post3.save(), 1000 * 60 * 3);

        });

        //return response
        console.log('User Created', newUser.hasOwnProperty('connections'));
        const token = createToken({ id: newUser._id, username: newUser.username });
        res.cookie('auth_token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        // res.status(201).json(responseObject({ ...newUser, auth: true }, true));
        res.status(201).json(responseObject({ auth: true, username: newUser.username }, true));
    } catch (error) {
        console.log(error);
        res.status(400).json(responseObject(null, false, error.message));
    }
}

module.exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = await getUserByUsername(username);
        if (!userData) throw new Error('User does not exist.');
        const { password: dbPassword, ...otherData } = userData;
        const validPassword = await bcrypt.compare(password, dbPassword);

        if (!validPassword) {
            console.log('incorrect password');
            return res.json(responseObject(null, false, { password: 'incorrect password' }));
        }
        console.log('Login successful');
        const token = createToken({ id: otherData._id, username: otherData.username });
        res.cookie('auth_token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        // res.status(200).json(responseObject({ ...otherData, auth: true }, true));
        res.status(200).json(responseObject({ auth: true, username }, true));
    } catch (error) {
        console.log(error);
        res.status(400).json(responseObject(null, false, error.message));
    }
}

module.exports.logout = async (req, res) => {
    console.log('logout sucessful');
    res.cookie('auth_token', '', { httpOnly: true, maxAge: 10 });
    res.json(responseObject({ auth: false }, true));
}

module.exports.fetchUser = async (req, res) => {
    const { username } = req.params;
    try {
        const data = await User.findOne({ username }, '_id username fullName avatar');
        if (!data) throw new Error('User not found');
        // const { password, email, ...otherData } = data.toObject();
        console.log("user fetched");
        res.json(responseObject({ ...data.toObject(), auth: true }, true));
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}
