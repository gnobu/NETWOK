const Joi = require('joi');

const validator = {};

validator.login = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().pattern(new RegExp('^\\w+$')).min(4).max(20).required(),
        password: Joi.string().pattern(new RegExp('^\\S+$')).required()
    }).with("username", "password");
    
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (Boolean(error)) next(error);
    next();
}

validator.register = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().pattern(new RegExp('^\\w+$')).min(4).max(20).required(),
        fullName: Joi.string().pattern(/[a-zA-Z'-]+ [a-zA-Z'-]+/).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        password: Joi.string().pattern(/[a-z0-9_$#*]/).min(8).required(),
        re_password: Joi.ref('password'),
        avatar: Joi.string(),
        bio: Joi.string(),
        skills: Joi.array()
    }).with("password", 're_password');
    
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (Boolean(error)) next(error);
    next();
}

module.exports = validator;