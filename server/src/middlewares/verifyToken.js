const config = require("../config/config");
const { User, Role } = require("../models");
const errorHandler = require("./errorHandler");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      return next(errorHandler("No token provided", httpStatus.UNAUTHORIZED));
    }
    const token = header.split(" ")[1];
    if (!token) {
      return next(errorHandler("No token provided", httpStatus.UNAUTHORIZED));
    }
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.secret);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(errorHandler("Token expired", httpStatus.UNAUTHORIZED));
      }
      return next(errorHandler("Invalid token", httpStatus.UNAUTHORIZED));
    }
    const user = await User.findById(decoded._id).populate("role");
    if (!user) {
      return next(errorHandler("Invalid Auth token", httpStatus.NOT_FOUND));
    }
    if (decoded.exp < Date.now() / 1000) {
      return next(errorHandler("Token expired", httpStatus.UNAUTHORIZED));
    }
    req.userId = user._id;
    req.user = {
      id: user._id,
      name: user.firstName + " " + user.lastName,
      role: user.role,
      permissions: user.role ? user.role.permissions : [],
    };
    next();
  } catch (error) {
    next(errorHandler(error?.message, httpStatus.BAD_REQUEST));
  }
};

module.exports = verifyToken;
