const mongoose = require("mongoose");
const { paginate } = require("./paginate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const { tokenTypes } = require("../config/tokenTypes");
const moment = require("moment");
const Token = require("./Token.model");

const userSchema = new mongoose.Schema(
  {
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    middleName: {
      type: String,
      // required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      // required: true,
      trim: true
    },
    city: {
      type: String,
      // required: true,
      trim: true
    },
    state: {
      type: String,
      // required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true,
      default: "Kenya"
    },
    firstLogin: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    userStatus:{
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "inactive"
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deletedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  },
  { timestamps: true }
);

userSchema.plugin(paginate);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  
  // Create moment objects for expiration times
  const accessTokenExpiresTime = moment().add(config.jwt.accessExpirationMinutes, "minutes");
  const refreshTokenExpiresTime = moment().add(config.jwt.refreshExpirationDays, "days");
  
  // Get Unix timestamps for token payloads
  const accessTokenExpires = accessTokenExpiresTime.unix();
  const refreshTokenExpires = refreshTokenExpiresTime.unix();
  
  const accessTokenPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
    type: tokenTypes.ACCESS,
    exp: accessTokenExpires,
  }
  
  const accessToken = jwt.sign(accessTokenPayload, config.jwt.secret);
  
  const refreshTokenPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
    type: tokenTypes.REFRESH,
    exp: refreshTokenExpires,
  }
  
  const refreshToken = jwt.sign(refreshTokenPayload, config.jwt.secret);
  
  await Token.create({
    token: refreshToken, 
    type: tokenTypes.REFRESH, 
    user: user._id, 
    expires: refreshTokenExpiresTime.toDate() // Use the moment object here
  });
  
  return {
    accessToken: {
      token: accessToken,
      expires: accessTokenExpiresTime.toDate() // Use the moment object here
    },
    refreshToken: {
      token: refreshToken,
      expires: refreshTokenExpiresTime.toDate() // Use the moment object here
    }
  }
}
userSchema.pre("save", async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

userSchema.methods.comparePassword = async function(password){
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}
const User = mongoose.model("User", userSchema);

module.exports = User;
