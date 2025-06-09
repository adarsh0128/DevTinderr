import React, { useState } from "react";
import { FaQuestionCircle, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import AIChatbot from "../help/AIChatbot";
import RaiseTicket from "../help/RaiseTicket";

const HelpCenter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ai-chat"); // Default tab
  const { theme } = useSelector((store) => store.theme);

  return (
    <>
      {/* Help Icon */}
      <div
        className="fixed bottom-10 right-10 bg-blue-500 p-4 rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition duration-300"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FaQuestionCircle className="text-white text-2xl" />
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className={` absolute min-h-screen inset-y-0 right-0 w-80 md:w-96 shadow-lg z-50 p-6 transition-transform transform ${
            theme === "dark"
              ? "bg-gradient-to-l from-[#DBE9EA] to-[#7DC387] text-white shadow-2xl"
              : "bg-gray-900 text-white"
          }`}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes className="text-2xl" />
          </button>

          <h2 className="text-2xl font-bold mb-6">Help Center</h2>

          {/* Tab Buttons */}
          <div className="flex space-x-4 mb-6">
            {/* <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "ai-chat"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("ai-chat")}
            >
              AI Chatbot
            </button> */}
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTab === "raise-ticket"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("raise-ticket")}
            >
              Raise a Ticket
            </button>
          </div>

          {/* Render Active Tab */}
          {/* {activeTab === "ai-chat" && <AIChatbot />} */}
          {activeTab === "raise-ticket" && <RaiseTicket />}
        </div>
      )}
    </>
  );
};

export default HelpCenter;
