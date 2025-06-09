const express = require('express')
const User = require('../models/user');
const profileRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {validateEditProfileData}=require('../utils/validation')

// user profile
profileRouter.get('/profile/view',userAuth , async(req , res)=>{

    try{ 
  
        const accessUser = req.accessUser
        res.send(accessUser)
  
    }catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  
   
  })

  profileRouter.patch('/profile/edit' , userAuth , async(req ,res)=>{
    
    try{
      if(!validateEditProfileData(req)){
          throw new Error("invalid edit request")
       }

       const user = req.accessUser

       
       Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]))
       await user.save()

       res.json({message :`${user.firstName} your profile is update successfully`,
      data :user,
      })

    }catch(err){
       res.status(401).send("Error: " + err.message)
    }
  })

  module.exports = profileRouter
  