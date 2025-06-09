const express = require('express')
const userRouter = express.Router()
const {userAuth}=require('../middlewares/auth')
const connectionRequestModel = require('../models/connectionRequest')
const User  = require('../models/user')

const USER_SELF_DATA ="firstName lastName  age  gender about  skills photoUrl"

//get all the pending connnection request for loggin user
userRouter.get('/user/requests/received' , userAuth , async(req , res)=>{
    try{
        const loggedUser = req.accessUser
        

        // console.log("Connection Request Model:", connectionRequestModel);

        const connectionRequest = await connectionRequestModel.find({
            toUserId : loggedUser._id,
            
             status:"interested"
        })
        .populate('fromUserId' , USER_SELF_DATA)
      
        

        res.json({message: "data fetch successfully", data : connectionRequest})

    }catch(err){
        res.status(400).send("ERROR: " +err.message)

    }
})

userRouter.get('/user/connections' , userAuth ,async(req , res)=>{
    try{
        const loggedInUser = req.accessUser;
        const connectionRequest = await connectionRequestModel.find({
            $or:[
                 {toUserId : loggedInUser._id , status: "accepted"},
                 {fromUserId : loggedInUser , status: "accepted"}
            ],
        }).populate('fromUserId' ,USER_SELF_DATA )
        .populate('toUserId' ,USER_SELF_DATA )

    const data = connectionRequest.map((row)=>{
        if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
            return row.toUserId;
        }
        return row.fromUserId});

    res.json({data})

    }catch(err){

    }
})

userRouter.get('/feed' , userAuth , async(req , res)=>{
    try{
        const loggedInUser = req.accessUser

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) ||10
        limit = limit>50? 50:limit

        const skip = (page-1)*limit

        const connectionRequest = await connectionRequestModel.find({
            $or:[
                { fromUserId: loggedInUser._id},
                { toUserId: loggedInUser._id}
            ],
        }).select("fromUserId toUserId");
        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })

       
  
         const users = await User.find({
            $and:[
                 {_id: {$nin: Array.from(hideUsersFromFeed)}},
                 {_id:{ $ne: loggedInUser._id}}
            ]
         }).select(USER_SELF_DATA).skip(skip).limit(limit)
        


        res.send(users)


    }catch(err){
        res.status(400).json({message : err.message})

    }
})

module.exports = userRouter