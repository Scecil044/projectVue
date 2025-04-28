const mongoose = require("mongoose");
const { paginate } = require("./paginate");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    permissions: {
        type: [String],
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

roleSchema.plugin(paginate);
const Role = mongoose.model("Role", roleSchema);
module.exports = Role;