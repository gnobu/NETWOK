const { verifyToken } = require('../middlewares/verifyToken');
const { createPost } = require('../controllers/post.controller');

const router = require('express').Router();

router.post('/create', verifyToken, (req, res) => {
    const userId = req.userId;
    const { content } = req.body;

    createPost(userId, content, res);
})

module.exports = router;