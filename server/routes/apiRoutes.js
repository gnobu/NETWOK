const router = require('express').Router();

const User = require('../models/schema/user');
const { fetchProfile, search } = require('../controllers/api.controller');
const { verifyToken } = require('../middlewares/verifyToken');

// search for user
router.post('/search', search)

// fetch user data
router.get('/profile/:username', verifyToken, fetchProfile);


module.exports = router;