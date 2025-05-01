const { Role} = require("../models")
const createRole = async(reqBody, userId = null)=>{
    try{
        if(userId){
            reqBody = { ...reqBody, createdBy: userId}
        };
        const role = await Role.create(reqBody);
        return {
            success: true,
            message: "Role Created Successfully",
            role
        }
    }catch(error){
        throw error;
    }
}

module.exports = {
    createRole     
}