const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  reelId: { // Changed `postId` to `reelId` for consistency with your route
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reel",  // The referenced model should be `Reel`, not `Post`
  },
  userId: { // Changed `userId` to reference the user who commented
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
  },
  commentText: { // Changed from `comment` to `commentText` for clarity
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value is set when the comment is created
  },
});

module.exports = mongoose.model("Comment", commentSchema);
