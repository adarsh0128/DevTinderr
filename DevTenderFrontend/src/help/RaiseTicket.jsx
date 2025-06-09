import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from '../utils/Constant';

const RaiseTicket = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [showMobileInput, setShowMobileInput] = useState(false);
  const { theme } = useSelector((store) => store.theme);

  const handleSubmit = async () => {
    if (!subject.trim() || !description.trim() || !email.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setShowMobileInput(true);
  };

  const handleMobileSubmit = async () => {
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(BASE_URL + "/raise-ticket", {
        subject,
        description,
        email,
        mobileNumber,
      });

      toast.success(`Ticket raised successfully! Your ticket number is ${response.data.ticketNumber}.`);
      toast.info("A confirmation email has been sent to your email address.");

      setSubject("");
      setDescription("");
      setEmail("");
      setMobileNumber("");
      setShowMobileInput(false);
    } catch (error) {
      console.error("Error raising ticket:", error);
      toast.error("Failed to raise ticket. Please try again.");
    }
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-lg ${
        theme === "dark"
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-white"
          : "bg-gray-900 text-white"
      }`}
    >
      <h3 className="text-lg font-bold mb-4">Raise a Ticket</h3>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className={`w-full p-2 mb-4 border rounded ${
          theme === "dark" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className={`w-full p-2 mb-4 border rounded ${
          theme === "dark" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
        rows="4"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
        className={`w-full p-2 mb-4 border rounded ${
          theme === "dark" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Submit
      </button>

      {/* Mobile Number Input (After Submit) */}
      {showMobileInput && (
        <div className="mt-4">
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your Mobile Number"
            className={`w-full p-2 mb-4 border rounded ${
              theme === "dark" ? "bg-white text-black" : "bg-gray-800 text-white"
            }`}
          />
          <button
            onClick={handleMobileSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded w-full"
          >
            Verify & Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default RaiseTicket;
