const Joi = require("joi");
const { objectId } = require("./custome.validations");


const createUser = Joi.object().keys({
    body: Joi.object().keys({
        firstName: Joi.string().required(),
        middleName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        role: Joi.custom(objectId).required(),
    }),
});

module.exports = {
    createUser
}