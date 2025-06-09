const express = require("express");
const mailRoute = express.Router();
const nodemailer = require("nodemailer");
const Ticket = require("../models/ticketSchema");
const dotenv = require("dotenv").config();

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 📌 Route: Raise a Ticket
mailRoute.post("/raise-ticket", async (req, res) => {
  const { email, subject, description, mobileNumber } = req.body;

  if (!subject || !description || !mobileNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Generate a unique ticket number
    const ticketNumber = `TICKET-${Date.now()}-${Math.floor(
      Math.random() * 1000
    )}`;

    // Save the ticket to the database
    const newTicket = new Ticket({
      subject,
      description,
      mobileNumber,
      ticketNumber,
    });
    await newTicket.save();

    // Send email with ticket number
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email, // Replace with user's email if available
      subject: "Your Ticket has been Raised",
      text: `Your ticket number is ${ticketNumber}. Our team will contact you shortly.`,
    });

    res.json({ message: "Ticket raised successfully", ticketNumber });
  } catch (error) {
    console.error("Error raising ticket:", error);
    res.status(500).json({ message: "Error raising ticket" });
  }
});

module.exports = mailRoute;
