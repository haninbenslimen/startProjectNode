const Joi = require('joi')

// Middleware de validation pour la route /signup
exports.validateSignup = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().password().required(),
        lastName: Joi.string().lastName().required(),
        firstName: Joi.string().firstName().required(),

    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    next()
}