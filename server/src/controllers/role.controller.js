const errorHandler = require("../middlewares/errorHandler");
const { roleService } = require("../services");
const logger = require("../middlewares/logger");
const httpStatus = require("http-status");

const createRole = async (req, res, next) => {
  try {
    const response = await roleService.createRole(req.body, req?.user?._id);
    if (!response) return next(errorHandler.notFound("Could not create role", httpStatus.BAD_REQUEST));
    res.status(httpStatus.CREATED).json(response);
  } catch (error) {
    logger.error("Error in createRole controller", error?.message);
    next(error);
  }
};


module.exports = {
    createRole
}