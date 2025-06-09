import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setPaymentStatus } from "../utils/paymentSlice"; // Import the action

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.theme);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePayment = () => {
    if (
      cardDetails.cardNumber.length === 16 &&
      cardDetails.expiryDate.length === 5 &&
      cardDetails.cvv.length === 3
    ) {
      // Update payment status in Redux store
      dispatch(setPaymentStatus(true));

      toast.success("Payment Successful! Redirecting to dashboard...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => {
        navigate("/app/getreel"); // Redirect to dashboard or any other page
      }, 3000);
    } else {
      toast.error("Please enter valid card details", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        theme === "dark"
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gradient-to-br from-base-100 to-base-300 text-white"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Payment</h1>
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Enter Card Details</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Card Number"
            className={`w-full px-4 py-2 border rounded-lg ${
              theme === "dark"
                ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
                : "bg-gradient-to-br from-base-100 to-base-300 text-white"
            }`}
            value={cardDetails.cardNumber}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
            }
            maxLength={16}
          />
          <input
            type="text"
            placeholder="MM/YY"
            className={`w-full px-4 py-2 border rounded-lg ${
              theme === "dark"
                ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
                : "bg-gradient-to-br from-base-100 to-base-300 text-white"
            }`}
            value={cardDetails.expiryDate}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, expiryDate: e.target.value })
            }
            maxLength={5}
          />
          <input
            type="text"
            placeholder="CVV"
            className={`w-full px-4 py-2 border rounded-lg ${
              theme === "dark"
                ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
                : "bg-gradient-to-br from-base-100 to-base-300 text-white"
            }`}
            value={cardDetails.cvv}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cvv: e.target.value })
            }
            maxLength={3}
          />
        </div>
        <button
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;