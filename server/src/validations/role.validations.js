const Joi = require("joi");

const createRole = Joi.object().keys({
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        permissions: Joi.array().items(Joi.string()).optional(),
    }),
});
const updateRole = Joi.object().keys({
    body: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        permissions: Joi.array().items(Joi.string()),
    }),
});
const getRole = Joi.object().keys({
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
});
const deleteRole = Joi.object().keys({
    params: Joi.object().keys({
        id: Joi.string().required(),
    }),
});
const getAllRoles = Joi.object().keys({
    query: Joi.object().keys({
        page: Joi.number(),
        limit: Joi.number(),
    }),
});

module.exports = {
    createRole,
    updateRole,
    getRole,
    deleteRole,
    getAllRoles,
};