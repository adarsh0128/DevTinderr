import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

const AIChatbot = () => {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!question.trim()) {
      setError("Question cannot be empty.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/ai-chat`,
        { message: question },
        { withCredentials: true }
      );

      const aiReply = response.data.response;

      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: question },
        { role: "ai", content: aiReply },
      ]);
      setQuestion("");
    } catch (err) {
      setError("Failed to get a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeMessage = (index) => {
    setChatHistory((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-3">AI Help Chatbot</h2>

      <div className="chat-history space-y-3 mb-4 max-h-96 overflow-y-auto">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg flex justify-between items-center ${
              chat.role === "user" ? "bg-blue-300" : "bg-gray-300"
            }`}
          >
            <span>
              <strong>{chat.role === "user" ? "You" : "AI"}:</strong>{" "}
              {chat.content}
            </span>
            <button
              className="text-red-500 font-bold ml-2"
              onClick={() => closeMessage(index)}
              aria-label="Remove message"
            >
              ✖
            </button>
          </div>
        ))}
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded-md"
          placeholder="Ask about coding..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          aria-label="Ask a question"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={sendMessage}
          disabled={loading}
          aria-label="Send question"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
