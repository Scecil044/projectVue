const mongoose = require("mongoose");
const { paginate } = require("./paginate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/config");

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
      required: true,
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
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
  },
  { timestamps: true }
);

userSchema.plugin(paginate);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, config.jwtSecret, {
    expiresIn: "7d"
  });
  return token;
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
