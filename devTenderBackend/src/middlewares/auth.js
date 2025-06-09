const jwt = require('jsonwebtoken');
const User  = require('../models/user');


const userAuth =async(req , res , next)=>{
    try{ 
        const getcookies = req.cookies
    
         const  {token} = getcookies
         if(!token){
          return res.status(401).send("please login middleware")
         }
    
      //validate my token
          const decodedMessage = await jwt.verify(token ,"DEV@Tinder$790")
         
          const {_id} = decodedMessage;
     
    
          const accessUser = await User.findById(_id)
          if(!accessUser){
            throw new Error("user not found")
          }
           req.accessUser = accessUser
         next()
        
    
      }catch(err){
        res.status(400).send("ERROR: " + err.message)
    }

   

}

module.exports = {
    
    userAuth ,
}
