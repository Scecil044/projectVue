const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Number
    },
    isBlackListed: {
        type: Boolean,
        default: false
    }
}, {timestamps:true});


const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;