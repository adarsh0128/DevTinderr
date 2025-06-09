import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/Constant";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for toggling password visibility

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const emailID = location.state?.email || "";

  const handleUpdatePassword = async () => {
    if (!emailID) {
      toast.error("User email not found! Please verify OTP again.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/update-password`, // Fixed string interpolation
        {
            emailID,
          newPassword: password,
          confirmPassword,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message);
      setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Enter New Password</h2>

        {/* Display Email (Read-Only) */}
        {emailID && (
          <div className="mb-4 text-gray-400 text-center text-sm">
            Updating password for: <span className="font-semibold">{emailID}</span>
          </div>
        )}

        {/* New Password Input */}
        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 text-gray-900 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Confirm Password Input */}
        <div className="relative mb-4">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 text-gray-900 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            className="absolute right-4 top-3 text-gray-500 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Update Password Button */}
        <button
          onClick={handleUpdatePassword}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
