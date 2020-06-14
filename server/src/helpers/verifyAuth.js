const Joi = require('@hapi/joi')

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        names: Joi.string().min(2).required(),
        last_names: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    })


    return schema.validate(data);

}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    })


    return schema.validate(data);

}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation 