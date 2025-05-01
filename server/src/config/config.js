const Joi = require("joi");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envarsSchema = Joi.object().keys({
    PORT: Joi.string().required(),
    NODE_ENV: Joi.string().valid("development", "production", "test").required(),
    DB_URL: Joi.string().description("Mongo connection setring").required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.string().required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.string().required(),
}).unknown();

const {value: envars, error} = envarsSchema.prefs({errors: {label: "key"}}).validate(process.env);
if(error){
    throw new Error(`Config validation error: ${error.message}`);
}
module.exports = {
    port: envars.PORT,
    node_env : envars.NODE_ENV,
    dbUrl: envars.DB_URL,
    jwt:{
        secret: envars.JWT_SECRET,
        accessExpirationMinutes: envars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envars.JWT_REFRESH_EXPIRATION_DAYS
    }
}