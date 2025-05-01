const errorHandler = require("../middlewares/errorHandler");
const httpStatus = require("http-status");
const logger = require("../middlewares/logger");
const { userService } = require("../services");

const createUser = async(req, res,next)=>{
    try{
        const response = await userService.createUser(req.body, req?.user?._id);
        if(!response) return next(errorHandler.notFound("Could not create user", httpStatus.BAD_REQUEST));
        res.status(httpStatus.CREATED).json(response);
    }catch(error){
        logger.error("Error in createUser controller", error?.message);
        next(error);
    }
}

module.exports = {
    createUser
}