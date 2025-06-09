const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../models/messageSchema");

const chatRouter = express.Router();

chatRouter.get("/chat/:userId", userAuth, async (req, res) => {
  const { userId } = req.params;
  const loggesUserId =req.accessUser._id;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [loggesUserId, userId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new Chat({
        participants: [loggesUserId, userId],
        messages: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.error(err);
  }
});

module.exports = chatRouter;