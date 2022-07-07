const router = require('express').Router();
const User = require('../models/schema/user');


router.post('/', async (req, res) => {
    const { type, content } = req.body;
    if (!type === 'skill') {
        const result = User.find({})
    }
})



module.exports = router;