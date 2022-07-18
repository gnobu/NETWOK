const router = require('express').Router();

const { connect, fetchProfile, request, search } = require('../controllers/api.controller');
const { verifyToken } = require('../middlewares/verifyToken');

// search for user
router.post('/search', verifyToken, search)

// fetch user profile
router.get('/profile/:username', verifyToken, fetchProfile);

// // toggle request to connect with other user
// router.patch('/request_connect/:userId', verifyToken, request);

// toggle connect with other user
router.patch('/connect/:userId', verifyToken, connect);


module.exports = router;