const app = require("./app");
const http = require("http");
const config = require("./config/config");
const { connectDb } = require("./utils/DB");
const logger = require("./middlewares/logger");
require("colors");


const startServer = async()=>{
    await connectDb();
    const server = http.createServer(app);

    server.listen(config.port, ()=>{
        logger.info(`Server is running on port http://localhost:${config.port}`.cyan.underline);
    });
}
startServer();