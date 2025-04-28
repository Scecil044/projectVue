const errorHandler = (message, statusCode)=>{
    const error = new Error();
    error.message =  message.replace(/[\"\\]/g, '');
    error.statusCode = statusCode;
    return error;
}

module.exports = errorHandler;