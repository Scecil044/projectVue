const { User } = require("../models");

const findByCredentials = async(email, password)=>{
    try{
        const user = await User.findOne({email, is_deleted: false});
        if(!user) return null;
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return null;
        if(user.userStatus === "suspended"){
            throw new Error("This Account has been suspended. Please contact support.");
        }
        return user;
    }catch(error){
        throw error;
    }
}
const loginClient = async(reqBody)=>{
    try{
        const isUser = await findByCredentials(reqBody.email, reqBody.password);
        if(!isUser) throw new Error("Invalid Credentials");
        const tokens =await isUser.generateAuthToken();

       
        const updatedUserDoc =await User.findByIdAndUpdate(isUser._id, {lastLogin: Date.now(), firstLogin: false}, {new: true});
        const userObject  = updatedUserDoc.toObject();
        delete userObject.password;
        return {
            success: true,
            message: "Login Successful",
            tokens,
            user: userObject
        }
    }catch(error){
        throw error;
    }
}

module.exports = {
    loginClient
}