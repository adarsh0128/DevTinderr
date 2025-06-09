const express = require("express");
const reelrouter = express.Router();
const Reel = require("../models/reelScheme"); // Import the Reel model
const { userAuth } = require("../middlewares/auth"); // Middleware for authentication

// Route to get all reels for the authenticated user
reelrouter.get("/getReels", userAuth, async (req, res) => {
  try {
    const userId = req.userId; // Assuming req.userId is set by userAuth middleware

    // Fetch all reels belonging to the authenticated user
    const reels = await Reel.find({}).populate("user"); // Populate user data from the user field

    // Check if reels are found
    if (reels.length === 0) {
      return res.status(404).json({ message: "No reels found for this user" });
    }

    res.status(200).json({
      message: "Reels fetched successfully",
      reels,
    });
  } catch (error) {
    console.error("Error fetching reels:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = reelrouter;
