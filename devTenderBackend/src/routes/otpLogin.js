const express = require("express");
const otpLogin = express.Router();
const OTP = require("../models/otpSchema");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require('dotenv').config()
const bcrypt = require("bcrypt");


// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 📌 Route 1: Send OTP to Email
otpLogin.post("/send-otp", async (req, res) => {
  const { email } = req.body;


  console.log(email)

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
    const newOtp = new OTP({ email, otp });
    await newOtp.save();

    // Send OTP via Email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
});


otpLogin.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const validOtp = await OTP.findOne({ email, otp });

    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Check OTP expiration
    if (new Date() > validOtp.expiresAt) {
      await OTP.deleteOne({ email, otp });
      return res.status(400).json({ message: "OTP expired" });
    }

    // Remove OTP after successful verification
    await OTP.deleteOne({ email, otp });

    res.json({ message: "OTP verified successfully" }); // Ensure this message matches the frontend condition
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



otpLogin.patch("/update-password", async (req, res) => {
  const { emailID, newPassword, confirmPassword } = req.body;
const emailId = emailID
  // Validate input fields
  if (!emailID || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate password length
  if (newPassword.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    console.log("Updating password for email:", emailID);

    // Find the user by emailID
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(404).json({ message: "Email ID not found in the database" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { emailId: emailId }, // Query to find the user
      { password: hashedPassword }, // Update the password
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Failed to update password" });
    }

    res.json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = otpLogin;
