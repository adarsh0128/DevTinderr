const express = require("express");
const reelrouter = express.Router();
const Reel = require("../models/reelScheme"); // Import the Reel model
const {userAuth} = require("../middlewares/auth");; // Middleware for authentication

// Route to add a new reel
reelrouter.post("/addReel", userAuth, async (req, res) => {
  try {

    const { mediaUrl } = req.body;
    const userId =  req.accessUser._id;; // Check user authentication properly

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized! Please log in." });
    }

    // Validate required fields
    if (!mediaUrl) {
      return res.status(400).json({ error: "Media URL is required" });
    }

    // Create a new reel
    const newReel = new Reel({
      user: userId,
      mediaUrl,
    });

    // Save the reel to the database
    const savedReel = await newReel.save();

    res.status(201).json({
      message: "Reel added successfully",
      reel: savedReel,
    });
  } catch (error) {
    console.error("Error adding reel:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = reelrouter;
