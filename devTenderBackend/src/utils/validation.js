const validator = require('validator')

const validateSignUpData = (req)=>{
    const {firstName, lastName, emailId, password} =req.body
    if(!firstName || !lastName){
        throw new Error("name is not valid")
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email id is not valid")
    }
    // else if(!validator.isStrongPassword(password)){
    //     throw new Error("please enter a valid password")
    // }
}

const validateEditProfileData = (req)=>{
    const allowEditField = [
        "firstName",
        "lastName",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ]
    
   const isEditAllow= Object.keys(req.body).every(field=>allowEditField.includes(field))

   return isEditAllow
}


module.exports = {
    validateSignUpData,
    validateEditProfileData,
}