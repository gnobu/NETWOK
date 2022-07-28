const { verifyToken } = require('../middlewares/verifyToken');
const { createPost, likePost } = require('../controllers/post.controller');
const eventEmitter = require('../helpers/eventEmitter');

const router = require('express').Router();

router.post('/create', verifyToken, (req, res) => {
    try {
        const userId = req.userId;
        const { content } = req.body;

        createPost(userId, content, res);
    } catch (error) {
        console.log(error);
        res.status(500);
        eventEmitter.emit('error-log', error.message);
    }
});

router.patch('/like/:postId', verifyToken, (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        likePost(postId, userId, res);
    } catch (error) {
        console.log(error);
        res.status(500);
        eventEmitter.emit('error-log', error.message);
    }
});

module.exports = router;