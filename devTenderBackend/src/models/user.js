const mongoose  = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema =new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        index:true,
        minlength:2,
        maxlenght:50,
    },
    lastName:{
        type : String,
        index:true,
    },
    emailId: {
        type : String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("enter valid email" + value)
            }
        }

    },
    password: {
        type: String,
        required:true,
        
        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error("password is not valid" + value);
                

        //     }
        //}
    },
    age: {
        type: Number,
        min: 18,

    },
    gender: {
        type : String,
        validate(value){
            if(!["male" , "female" , "others"].includes(value)){
                throw new error('gender data is not valid')
            }
        },
    },
    photoUrl :{
        type: String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZxwCJ0PDLfFEpF09-lMCMhFMtCFoTVUJ0Q&s",
         
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("enter valid photoURL" + value)
            }
        }

    },
    about:{
        type:String,
        default: "this is default about any one",
    },
    
    skills:{
        type: [String]
    },
    likedPosts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
      ],
      likedReels: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reel",
        },
      ],
      reels: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Reel",
        },
      ],
      commentsOnPosts: [
        {
          postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
          },
          comment: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      commentsOnReels: [
        {
          reelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reel",
          },
          comment: {
            type: String,
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
},{
    timestamps:true,
})



// const User = mongoose.model('User' , userSchema )

// module.exports = User

userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({_id:user._id} ,"DEV@Tinder$790",{
        expiresIn:"7d"
    })
    return token
}

userSchema.methods.validatePassword = async function(passwordInputUser){
    const user = this
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputUser , 
        passwordHash
    )
    return isPasswordValid
}

module.exports = mongoose.model('User' , userSchema )