const User = require('../models/schema/user');
const PostMessage = require('../models/schema/postMessage');
const { responseObject } = require('./helpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;


const getUserByUsername = async (username) => {
    const found = await User.findOne({ username });
    if (!found) return false;
    return found.toObject();
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (payload) => {
    return jwt.sign(payload, TOKEN_SECRET, { expiresIn: maxAge })
}


const createUser = async (req, res) => {
    const data = req.body;
    try {
        const otherUser = await getUserByUsername(data.username);
        if (otherUser) {
            console.log('user already exists');
            return res.status(400).json(responseObject(null, false, 'User already exists'));
        }
        // creating mongoose document
        const newUser = new User(data);
        // generating salt to hash password
        const salt = await bcrypt.genSalt(10);
        // set password to hashed password
        newUser.password = await bcrypt.hash(newUser.password, salt);
        //save the user
        newUser.save((err) => {
            if (err) { throw new Error(err.message) }

            const post1 = new PostMessage({
                author: newUser._id,
                content: `Hello world, I'm ${newUser.fullName}. I just joined this platform and this is my first post.`
            });
            post1.save();

            const post2 = new PostMessage({
                author: newUser._id,
                content: `Bagged my first job today. Congrats to me`
            });
            post2.save();

            const post3 = new PostMessage({
                author: newUser._id,
                content: `Looking for collaborators on a project. message me if interested.`
            });
            post3.save();

        });
        //return response
        console.log('User Created');
        // console.log(newUser);
        newUser.populate('posts');
        res.status(201).json(responseObject(newUser.posts.length, true));
    } catch (error) {
        console.log(error);
        res.status(400).json(responseObject(null, false, error.message));
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userData = await getUserByUsername(username);
        if (!userData) throw new Error('User does not exist.');
        const { password: dbPassword, ...otherData } = userData;
        const validPassword = await bcrypt.compare(password, dbPassword);

        if (!validPassword) {
            console.log('incorrect password');
            return res.status(400).json(responseObject(null, false, 'incorrect password'));
        }
        console.log('Login successful');
        const token = createToken({ id: otherData._id, username: otherData.username });
        res.cookie('auth_token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json(responseObject({ ...otherData, auth: true }, true));
    } catch (error) {
        console.log(error);
        res.status(400).json(responseObject(null, false, error.message));
    }
}

const logout = async (req, res) => {
    console.log('logout sucessful');
    res.cookie('auth_token', '', { httpOnly: true, maxAge: 10 });
    res.json(responseObject({ auth: false }, true));
}

const checkUser = async (req, res) => {
    const { username } = req.body;
    try {
        const found = await getUserByUsername(username);
        res.json(responseObject({ found: Boolean(found) }, true));
    } catch (error) {
        console.log(error);
        res.status(400).json(responseObject(null, false, error.message));
    }
}

const fetchUser = async (req, res) => {
    const { username } = req.params;
    try {
        const data = await User.findOne({ username });
        if (!data) throw new Error('User not found');
        const { password, email, ...otherData } = data.toObject();
        console.log("profile fetched");
        res.json(responseObject({ ...otherData, auth: true }, true));
    } catch (error) {
        console.log(error);
        res.json(responseObject(null, false, error.message));
    }
}

module.exports = {
    createUser,
    login,
    logout,
    checkUser,
    fetchUser
}