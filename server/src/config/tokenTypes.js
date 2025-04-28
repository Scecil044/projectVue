const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    FORGOT_PASSWORD: 'forgot_password',
    VERIFY_EMAIL: 'verify_email',
};
const tokenTypesArray = Object.values(tokenTypes);

module.exports = {
    tokenTypes,
    tokenTypesArray,
};