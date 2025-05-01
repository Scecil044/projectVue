const { User } = require("../models");

const createUser = async(reqBody, userId = null)=>{
    try{
        if(userId){
            reqBody = {
                ...reqBody,
                createdBy: userId
            }
        };
        const user = await User.create(reqBody);
        const userObject = user.toObject();
        delete userObject.password;
        return {
            success: true,
            message: "User Created Successfully",
            user: userObject
        }
    }catch(error){
        throw error;
    }
}
module.exports = {
    createUser
}