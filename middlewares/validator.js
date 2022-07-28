const Joi = require('joi');

const validator = {};

validator.login = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().pattern(new RegExp('^\\w+$')).min(4).max(20).required()
            .messages({
                'string.pattern.base': 'Characters allowed are a-z, A-Z, 0-9, _'
            }),
        password: Joi.string().pattern(new RegExp('^\\S+$')).required()
            .messages({
                'string.pattern.base': 'Characters allowed are a-z, A-Z, 0-9, (_$#*.@)',
                'string.empty': `Required field.`
            })
    }).with("username", "password");

    const { error } = schema.validate(req.body, { abortEarly: false });
    if (Boolean(error)) next(error);
    next();
}

validator.register = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().pattern(new RegExp('^\\w+$')).min(4).max(20).required()
            .messages({
                'string.pattern.base': 'Characters allowed are a-z, A-Z, 0-9, _'
            }),
        fullName: Joi.string().pattern(/[a-zA-Z'-]+ [a-zA-Z'-]+/).required()
            .messages({
                'string.base': `Only texts allowed!`,
                'string.pattern.base': `Should have the format "John Doe".`,
                'string.empty': `Required field.`
            }),
        email: Joi.string().email({ minDomainSegments: 2 })
            .messages({
                'string.email': `Should have the format "example@mail.com".`,
                'string.empty': `Required field.`
            }),
        password: Joi.string().pattern(/^[\w\$\#\*\.\@\(\)]+$/).min(8).required()
            .messages({
                'string.pattern.base': 'Characters allowed are a-z, A-Z, 0-9, (_$#*.@)',
                'string.empty': `Required field.`,
                'string.min': `Must have a minimum of 8 characters.`
            }),
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