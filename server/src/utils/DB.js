const logger = require("../middlewares/logger");

const mongoose = require("mongoose");
const config = require("../config/config");
 const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(config.dbUrl);
        logger.info(`MongoDB connected: ${conn.connection.host}`)
    }catch(error){
        logger.info(error?.message);
        process.exit(1);
    }
}

module.exports = {connectDb}