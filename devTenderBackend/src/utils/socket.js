const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/messageSchema");

const getSecretRoomId = (userId, chatid) => {
  return crypto
    .createHash("sha256")
    .update([userId, chatid].sort().join("-"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "https://tinderfordeveloper.vercel.app",
    },
  });

  io.on("connection", (socket) => {
    //handle event

    socket.on("joinChat", ({ firstName, lastName, userId, chatid }) => {
      const roomId = getSecretRoomId(userId, chatid);
      console.log(firstName + "send room connectin" + roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, chatid, text }) => {
        try {
          const roomId = getSecretRoomId(userId, chatid);
          console.log(firstName + " " + text);

          // TODO: Check if userId & targetUserId are friends

          let chat = await Chat.findOne({
            participants: { $all: [userId, chatid] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, chatid],
              messages: [],
            });
          }

          chat.messages.push({
            senderId: userId,
            text,
          });

          await chat.save();
          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
        } catch (err) {
          console.log(err);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
