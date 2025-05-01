const errorHandler = require("../middlewares/errorHandler");
const httpStatus = require("http-status");
const logger = require("../middlewares/logger");
const { authService } = require("../services");

const loginClient = async(req,res,next)=>{
    try{
        const response = await authService.loginClient(req.body);
        res.status(httpStatus.OK).json(response);
    }catch(error){
        logger.error("Error in loginClient controller", error?.message);
        next(error);
    }
}


module.exports = {
    loginClient
}

