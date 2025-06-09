const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Changed from otpemail to email
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, default: () => new Date(Date.now() + 5 * 60 * 1000) }, // OTP expires in 5 min
});

module.exports = mongoose.model("OTP", otpSchema);