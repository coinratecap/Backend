const Joi = require('joi')


// These validations will be called in Post services. 


const userValidation = (body) => {
    const schema = {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().min(6).required(),
        gender: Joi.string().min(8).required(),
        phone: Joi.string().min(8).required(),
        password: Joi.string().required(),
        photo: Joi.string().required(),
        resetPasswordToken: Joi.string().required(),
        resetPasswordExpires: Joi.string().required(),
    }
    return Joi.validate(body, schema)
}

const coinValidation = (body) => {
    const schema = {
        name: Joi.string().required(),
        website: Joi.string().required(),
        explorers: Joi.string().min(6).required(),
        community: Joi.string().min(8).required(),
    }
    return Joi.validate(body, schema)
}

const blogValidation = (body) => {
    const schema = {
        title: Joi.string().required(),
        category: Joi.string().required(),
        shortDescription: Joi.string().min(6).required(),
        author: Joi.string().required(),
        description: Joi.string().min(10).required(),
    }
    return Joi.validate(body, schema)
}

// TODO: validations for update and delete services

module.exports = {
    userValidation,
    blogValidation,
    coinValidation
}
