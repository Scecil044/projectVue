const mongoose = require("mongoose");
const { paginate } = require("./paginate");

const roleSchema = new mongoose.Schema({

}, {timestamps: true});

roleSchema.plugin(paginate);
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;