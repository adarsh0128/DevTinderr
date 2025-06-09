const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
          type:mongoose.Schema.Types.ObjectId,
          required: true,
           ref: 'User'
        
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId ,
        required:true,
         ref: 'User'
    },
    status:{
        type :String,
        required:true,
        enum:{
            values:["ignored" , "interested" , "accepted" , "rejected"],
            message:`{VALUE} is incorrect status type`, 
        }

    }
   
},
{
    timestamps:true,
},
)

connectionRequestSchema.indexes({fromUserId:1 , toUserId:1})

connectionRequestSchema.pre("save" , function(next) {
    const connectionRequest = this;

    //check if the fromUserid is same as touserid
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("can not send connection request to yourself")
    }
next()
}

)

const connectionRequestModel = new mongoose.model("ConnectionRequest" , connectionRequestSchema)

module.exports = connectionRequestModel;