const mongoose = require("mongoose");
const { paginate } = require("./paginate");

const userSchema = new mongoose.Schema({

}, {timestamps: true});

userSchema.plugin(paginate);
const User = mongoose.model("User", userSchema);

module.exports = User;