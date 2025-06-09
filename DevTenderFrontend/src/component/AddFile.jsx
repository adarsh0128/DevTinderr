import { useState } from "react";
import { useSelector } from "react-redux"; // To get the theme from the Redux store
import { Camera } from "lucide-react"; // Importing icon from lucide-react
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

const AddFile = () => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { theme } = useSelector((store) => store.theme); // Get the current theme from Redux

  // Handle upload
  const handleUpload = async () => {
    if (!mediaUrl || !mediaType || !caption) {
      setMessage("Please enter a valid media URL, select type, and add a caption.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${BASE_URL}/create`,
        { caption, mediaUrl, mediaType },
        { withCredentials: true } // Ensure cookies are sent for authentication
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`h-full flex justify-center items-center p-6 ${
        theme === 'dark'
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gray-900 text-white"
      }`}
    >
      <div
        className={ ` max-w-md w-full p-6  rounded-lg shadow-md ${
          theme === 'dark'
            ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
            : "bg-gray-900 text-white"
        }`}
      >
        <h2 className="text-xl font-bold mb-12 text-center">
          Add Your Photo or Video
        </h2>

        <label className="block  font-medium mb-8">Add Photo</label>
        <input
          type="text"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
          placeholder="Enter media URL (e.g., Cloudinary, S3, Firebase)"
          className="w-full text-white p-2 border rounded mb-4"
        />

        <label className="block  font-medium mb-8">Select Media Type</label>
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="w-full p-2 border rounded mb-8 text-white"
        >
          <option  value="">Select Media Type</option>
          <option   value="image">Image</option>
          <option   value="video">Video</option>
        </select>

        <label className="block  font-medium mb-8">Add Caption</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter caption"
          className="w-full text-white p-2 border rounded mb-4"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default AddFile;
