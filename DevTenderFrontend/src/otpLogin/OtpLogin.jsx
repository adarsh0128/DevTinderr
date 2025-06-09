import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../utils/Constant";

const OtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Function to validate email
  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Handle sending OTP
  const sendOtp = async () => {
    if (!isValidEmail(email)) {
      toast.error("Invalid email format!");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/send-otp`, { email }, { withCredentials: true });
      toast.success("OTP sent successfully!");
      setIsOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification
  const verifyOtp = async () => {
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      toast.error("OTP must be 6 digits!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/verify-otp`, { email, otp }, { withCredentials: true });

      if (response.data.message === "OTP verified successfully") {
        toast.success("OTP Verified! Redirecting to reset password...");
        navigate("/updatePassword " ,  { state: { email } }); // Redirect to the Forget Password page
      } else {
        toast.error(response.data.message || "Invalid OTP. Try again!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resending OTP
  const resendOtp = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/send-otp`, { email });
      toast.success("OTP resent successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP. Try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">OTP Login</h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 text-gray-900 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={isOtpSent}
        />

        {/* Send OTP Button */}
        {!isOtpSent && (
          <button
            onClick={sendOtp}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded transition duration-300"
            disabled={isLoading}
            aria-label="Send OTP"
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {/* OTP Input (Appears after OTP is sent) */}
        {isOtpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full p-3 mt-4 mb-4 text-gray-900 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded transition duration-300 mb-2"
              disabled={isLoading}
              aria-label="Submit OTP"
            >
              {isLoading ? "Verifying..." : "Submit OTP"}
            </button>
            <button
              onClick={resendOtp}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded transition duration-300"
              disabled={isLoading}
              aria-label="Resend OTP"
            >
              {isLoading ? "Resending..." : "Resend OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpLogin;
