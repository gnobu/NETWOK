const router = require('express').Router();

const { verifyToken } = require('../middlewares/verifyToken');
const { createUser, login, checkUser, fetchUser, logout } = require('../controllers/auth.controller');
const validator = require('../middlewares/validator');
const { responseObject } = require('../controllers/responseObject');

// Check for user
router.post('/', checkUser);

// Create a user
router.post('/register', validator.register, createUser);

// LOGIN
router.post('/login', validator.login, login);

// LOGOUT
router.get('/logout', logout);

// fetch user data
router.get('/:username', verifyToken, fetchUser);

// Error handler
router.use((error, req, res, next) => {
    if (error.details) {
        const msgs = {};
        error.details.forEach(err => {
            err.path[0] === 're_password'
                ? msgs[err.path[0]] = 'Must match password'
                : msgs[err.path[0]] = err.message;
        });
        console.log(msgs);
        res.json(responseObject(null, false, msgs));
    } else {
        console.log("AUTH ERROR HANDLER", error);
        // res.json(responseObject(null, false, error.details));
    }
});

module.exports = router;