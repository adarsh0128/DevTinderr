import { useState } from "react";
import { Camera, Calendar, FileText } from "lucide-react";
import { useSelector } from "react-redux"; // To get the theme from the Redux store

const AddPostFeature = () => {
  const [postText, setPostText] = useState("");
  const user = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme); // Get the current theme from Redux

  return (
    <div
      className={`flex flex-col items-center justify-center pt-5 ${
        theme === 'dark'
        ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
        : "bg-gray-900 text-white"
    }`}
    >
      <div
        className={`w-full max-w-lg p-4 rounded-lg shadow-md ${
            theme === 'dark'
            ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
            : "bg-gray-900 text-white"
        }`}
      >
        {/* Input section */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
          <input
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind?"
            className={`flex-grow p-2 rounded-lg border focus:outline-none focus:ring-2 ${
                theme === 'dark'
                ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
                : "bg-gray-900 text-white"
            }`}
          />
        </div>

        {/* Buttons Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Media Button */}
          <button
            className={`flex items-center justify-center gap-2 py-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-blue-600 text-blue-400"
                : "bg-blue-100 hover:bg-blue-200 text-blue-600"
            }`}
          >
            <Camera className="w-5 h-5" />
            <span>Media</span>
          </button>

          {/* Event Button */}
          <button
            className={`flex items-center justify-center gap-2 py-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-yellow-600 text-yellow-400"
                : "bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Event</span>
          </button>

          {/* Write Article Button */}
          <button
            className={`flex items-center justify-center gap-2 py-2 rounded-lg transition ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-red-600 text-red-400"
                : "bg-red-100 hover:bg-red-200 text-red-600"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Article</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostFeature;
