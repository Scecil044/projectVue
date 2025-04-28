const errorHandler = require("../middlewares/errorHandler");
const httpStatus = require("http-status");
const logger = require("../middlewares/logger");

const loginClient = async(req,res,next)=>{
    try{
        res.status(httpStatus.OK).json({
            success:true,
            message:"Login Successful"
        })
    }catch(error){
        next(error);
    }
}


module.exports = {
    loginClient
}

