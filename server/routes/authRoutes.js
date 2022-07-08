const router = require('express').Router();

const { verifyToken } = require('../middlewares/verifyToken');
const { createUser, login, checkUser, fetchUser, logout } = require('../controllers/auth.controller');
const validator = require('../middlewares/validator');

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

module.exports = router;