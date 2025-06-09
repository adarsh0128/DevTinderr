import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux"; // ✅ Import useSelector
import { createSockerConnection } from "../chat/ChatConfig"; // ✅ Fixed function name
import axios from "axios";
import { BASE_URL } from "../utils/Constant";


const Chat = () => {
  const { chatid } = useParams(); // ✅ Get chat user ID from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const location = useLocation();
  const { firstName , lastName } = location.state || {}; // Get firstName from state

  

  const user = useSelector(store => store.user); 
  const { theme } = useSelector(store => store.theme); // ✅ Get theme from Redux

  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + chatid, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    const socket = createSockerConnection();

    socket.emit("joinChat", { firstName: user.firstName, lastName:user.lastName, userId, chatid });

    socket.on("messageReceived", ({ firstName,lastName, text }) => {
      console.log(firstName);
      setMessages((messages) => [...messages, { firstName, lastName , text, sender: firstName === user.firstName ? "Me" : "Other" }]);
      console.log(messages)
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, chatid]);

  // Function to send a message
  const sendMessage = () => {
    if (!newMessage.trim()) return; // Prevent empty messages

    const socket = createSockerConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      chatid,
      text: newMessage,
    });

    setNewMessage(""); // Clear input after sending
  };

  return (
    <div className={`max-w-lg mx-auto mt-10 border border-gray-600 p-5 h-[70vh] flex flex-col shadow-lg rounded-lg bg-whitetheme === "dark"
              ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
              : "bg-gray-900 text-white"
          }`}>
      <h1 className="p-5 border-b border-gray-300 text-lg font-bold text-gray-700">
        Chat with <span className="text-red-600">{firstName}{lastName}</span> 
      </h1>

      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-5 space-y-4 rounded-lg ${theme === "dark"
              ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
              : "bg-gray-900 text-white"
          }`}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${user.firstName === msg.firstName ?  "justify-start" : "justify-end"}`}>
            <div className="">
            <div className="text-sm font-semibold pb-2 pl-5">{user.firstName === msg.firstName ? "you" :msg.firstName}</div>
            <div
              className={`max-w-xs p-3 rounded-lg shadow-md ${
                user.firstName === msg.firstName 
                  ?"bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
             
              <div className="mt-1">{msg.text}</div>
            </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center border-t border-gray-300 p-3 rounded-lg shadow-md">
        <input
          type="text"
          className={`flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
            theme === "dark"
              ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
              : "bg-gray-900 text-white"
          }`}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send on Enter key press
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
