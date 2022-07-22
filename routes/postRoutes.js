const { verifyToken } = require('../middlewares/verifyToken');
const { createPost, likePost } = require('../controllers/post.controller');

const router = require('express').Router();

router.post('/create', verifyToken, (req, res) => {
    const userId = req.userId;
    const { content } = req.body;

    createPost(userId, content, res);
});

router.patch('/like/:postId', verifyToken, (req, res) => {
    try {
        const postId = req.params.postId;
        const userId  = req.userId;
    
        likePost(postId, userId, res);
    } catch (error) {
        return res.sendStatus(500);
    }
});

module.exports = router;