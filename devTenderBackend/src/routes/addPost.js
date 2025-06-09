const express = require("express");
const Post = require("../models/postModel");
const {userAuth} = require("../middlewares/auth"); // Ensure authentication middleware exists

const PostRouter = express.Router();

// Upload a new post with image/video URL
PostRouter.post("/create", userAuth, async (req, res) => {
  try {
    const { caption, mediaUrl, mediaType } = req.body;
    const userId =  req.accessUser._id;; // Check user authentication properly

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    if (!mediaUrl || !mediaType) {
      return res.status(400).json({ message: "Media URL and type are required!" });
    }

    // Validate mediaType
    if (!["image", "video"].includes(mediaType)) {
      return res.status(400).json({ message: "Invalid media type. Use 'image' or 'video'." });
    }

    const newPost = new Post({
      user: userId,
      caption,
      mediaUrl,
      mediaType,
    });

    await newPost.save();
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error uploading post", error: error.message });
  }
});

module.exports = PostRouter;
