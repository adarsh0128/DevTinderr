const express = require("express");
const User = require("../models/user");
const Post = require("../models/postModel");

const routerSeeProfile = express.Router();

// GET profile and posts by user ID
routerSeeProfile.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find user details and exclude password
    const userDetail = await User.findById(id).select("-password");
    if (!userDetail) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find all posts by this user
    const posts = await Post.find({ user: id });

    res.status(200).json({ user: userDetail, posts: posts });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = routerSeeProfile;
