const mongoose = require("mongoose")


const reelSchema = new mongoose.Schema({

        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
    

    
        mediaUrl: {
          type: String, // Stores the URL of image or video
          required: true,
        },

    
        likes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "like",
          },
        ],
    
        comments: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
          },
        ],
      },
      { timestamps: true }
    
)

module.exports = mongoose.model("Reel", reelSchema)