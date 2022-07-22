const router = require('express').Router();

const { connect, fetchProfile, fetchTimeline, search } = require('../controllers/api.controller');
const { verifyToken } = require('../middlewares/verifyToken');

// search for user
router.post('/search', verifyToken, search)

// fetch user profile
router.get('/profile/:username', verifyToken, fetchProfile);

// fetch user timeline
router.get('/timeline', verifyToken, fetchTimeline);

// toggle connect with other user
router.patch('/connect/:userId', verifyToken, connect);


module.exports = router;