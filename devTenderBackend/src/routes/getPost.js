const express = require('express')
const Post =require("../models/postModel"); // Import the Post model

const getrouter = express.Router();

// Fetch all posts
getrouter.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "firstName lastName photoUrl"); // Populate user details
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts: " + err.message });
  }
});

module.exports= getrouter;