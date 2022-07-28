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

// Error handler
router.use((error, req, res, next) => {
    console.log("API ERROR HANDLER", error);
    eventEmitter.emit('error-log', error.message);
    // res.json(responseObject(null, false, error.details));
});


module.exports = router;