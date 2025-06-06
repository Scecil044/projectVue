const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const errorHandler = require('./errorHandler');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'headers']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(errorHandler(errorMessage,httpStatus.BAD_REQUEST));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
