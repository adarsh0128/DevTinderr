import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";
import { useSelector } from "react-redux";


const AddReel = () => {
  const [mediaUrl, setMediaUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useSelector((store) => store.theme);

  const handleMediaUrlChange = (e) => {
    setMediaUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous error message

    try {
      const token = localStorage.getItem('token'); // or session storage, depending on your setup
const response = await axios.post(
  BASE_URL + '/addReel',
  { mediaUrl },
  {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    withCredentials: true, // if you're still using cookies
  }
);


      // Handle success response
      console.log(response.data);
      navigate('/app')
     
    } catch (err) {
      console.error("Error adding reel:", err);
      setError("Failed to add reel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-96  justify-center container mx-auto p-4">
    <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${
         theme === 'dark'
          ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gray-900 text-white"
      }`}>
      <h2 className="text-2xl font-semibold mb-4">Add a New Reel</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="mediaUrl" className="block text-sm font-medium text-white">
            Media URL
          </label>
          <input
            type="text"
            id="mediaUrl"
            value={mediaUrl}
            onChange={handleMediaUrlChange}
            className="mt-1 text-white p-2 w-full border rounded-md"
            placeholder="Enter media URL"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 bg-blue-500 text-white rounded-md ${loading ? "opacity-50" : ""}`}
        >
          {loading ? "Adding..." : "Add Reel"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default AddReel;
