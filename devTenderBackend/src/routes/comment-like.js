const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const Post = require('../models/postModel'); 
const Reel = require('../models/reelScheme'); 
const Like = require('../models/likeModel'); 
const Comment = require('../models/comment'); 

require("dotenv").config()

const likeCommentRouter = express.Router();

// Like a Post
likeCommentRouter.post('/like/post/:postId', userAuth, async (req, res) => {
  try {
    const userId = req.accessUser._id;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ user: userId, post: postId, type: 'post' });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    const newLike = new Like({
      user: userId, // Ensure correct field name
      post: postId,
      type: 'post',
    });

    const data = await newLike.save();
    post.likes.push(data);
    await post.save(); 

    // Update like count in the post
    post.likesCount += 1;
    await post.save();

    res.json({
      message: `Post liked by ${req.accessUser.firstName}`,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message + " like error" });
  }
});

//get a like on post
likeCommentRouter.get('/like/post/:postId', userAuth, async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Fetch likes and populate user details (name and photo)
    const likes = await Like.find({ post: postId }).populate('user', 'firstName lastName photoUrl');

    res.json({
      message: "Likes fetched successfully",
      data: likes,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});


// Like a Reel
likeCommentRouter.post('/like/reel/:reelId', userAuth, async (req, res) => {
  try {
    const userId = req.accessUser._id; // Get the user from the authenticated request
    const reelId = req.params.reelId; // Get the reel ID from the request parameters

    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    // Check if the user has already liked the reel
    const existingLike = await Like.findOne({ user: userId, reel: reelId, type: 'reel' });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this reel" });
    }

    // Create a new like document
    const newLike = new Like({
      user: userId,
      reel: reelId,
      type: 'reel',
    });

    const data = await newLike.save();

    // Update the reel's likes array by pushing the new like's ID
    reel.likes.push(newLike._id);
    await reel.save(); // Save the updated reel

    // Update the likes count
    reel.likesCount += 1;
    await reel.save();

    res.json({
      message: `Reel liked by ${req.accessUser.firstName}`,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});


//get comment on post
likeCommentRouter.get('/comment/post/:postId', userAuth, async (req, res) => {
  try {
    const postId = req.params.postId;

    // Fetch the post using the postId
    const post = await Post.findById(postId).populate({
      path: 'comments', // Populate the comments field
      populate: { 
        path: 'userId', // Populate user details in comments
        model: 'User', 
        select: 'firstName lastName photoUrl'
      }
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    console.log(post); // For debugging, check the post object and comments

    res.json({
      message: 'Comments fetched successfully',
      data: post.comments, // Directly return the populated comments from the post
    });
  } catch (err) {
    res.status(500).json({ message: 'ERROR: ' + err.message });
  }
});




// Comment on Post
likeCommentRouter.post('/comment/post/:postId', userAuth, async (req, res) => {
  try {
    const userId = req.accessUser._id;
    const postId = req.params.postId;
    const { commentText } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      userId: userId,
      postId: postId,
      commentText,
    });

    console.log(newComment);

    const data = await newComment.save();
    post.comments.push(data);
    await post.save();

    post.commentsCount += 1;
    await post.save();

    // Populate user details (name and photo) when returning comment
    const populatedComment = await Comment.findById(data._id).populate('userId', 'firstName lastName photoUrl');
    console.log(populatedComment);

    res.json({
      message: `Comment added by ${req.accessUser.firstName}`,
      data: populatedComment,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});


// Comment on Reel
likeCommentRouter.post('/comment/reel/:reelId', userAuth, async (req, res) => {
  try {
    const userId = req.accessUser._id;
    const reelId = req.params.reelId;
    const { commentText } = req.body;

    const reel = await Reel.findById(reelId);
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      userId: userId,
      reelId: reelId,
      commentText,
    });
    console.log(newComment);


    const data = await newComment.save();
    reel.comments.push(data);
    await reel.save();
   
    

    reel.commentsCount += 1;
    await reel.save();

    // Populate user details (name and photo) when returning comment
    const populatedComment = await Comment.findById(data._id).populate('userId', 'firstName lastName photoUrl');
  console.log(populatedComment)
    res.json({
      message: `Comment added by ${req.accessUser.firstName}`,
      data: populatedComment,
    });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});

// Get Like and Comment Count for a Post
likeCommentRouter.get('/counts/post/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeCount = post.likesCount || 0;
    const commentCount = post.commentsCount || 0;

    res.json({ likeCount, commentCount });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});

// Get  Comment  for a Reel

// Get comments for a Reel
likeCommentRouter.get('/comments/reel/:reelId', async (req, res) => {
  try {
    const { reelId } = req.params;

    // Populate comments with user details (Fixing the field name)
    const reel = await Reel.findById(reelId).populate({
      path: "comments",
      populate: { path: "userId", model: "User", select: "firstName lastName photoUrl" }, // Use "userId" instead of "user"
    });
    

    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    res.json({ comments: reel.comments, commentCount: reel.comments.length });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});



// Get likes for a Reel
likeCommentRouter.get('/likes/reel/:reelId', async (req, res) => {
  try {
    const { reelId } = req.params;

    // Find the reel and populate the likes
    const reel = await Reel.findById(reelId).populate("likes");
  
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    res.json({ likes: reel.likes, likeCount: reel.likes.length });
  } catch (err) {
    res.status(500).json({ message: "ERROR: " + err.message });
  }
});



module.exports = likeCommentRouter;
