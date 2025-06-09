import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Gold = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((store) => store.theme);
  const [coupon, setCoupon] = useState("");
  const [price] = useState(999); // Original Price
  const [finalPrice, setFinalPrice] = useState(999);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const discount = 20; // 20% Discount
  const discountCode = "GOLD20";

  const applyDiscount = () => {
    if (coupon === discountCode) {
      const newPrice = price - (price * discount) / 100;
      setFinalPrice(newPrice);
      setIsCouponApplied(true);
      toast.success(`Coupon applied! You saved ${discount}%`);
    } else {
      toast.error("Invalid Coupon Code");
      setIsCouponApplied(false);
    }
  };



  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 rounded-lg shadow-lg ${
        theme === "dark"
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gradient-to-br from-base-100 to-base-300 text-white"
      }`}
    >
      {/* Coupon Display in Navbar */}
      <div className="w-full bg-yellow-500 text-center p-2 text-black font-semibold">
        🎉 Use Coupon Code: <span className="font-bold">{discountCode}</span> & Get {discount}% Off!
      </div>

      <h1 className="text-3xl font-bold mt-6 mb-4">Gold Membership</h1>
      <p className="text-lg text-center max-w-md">
        Unlock premium features with Gold Membership. Enjoy exclusive perks, priority support, and early access to new features.
      </p>

      {/* Pricing Card */}
      <div className="mt-6 p-6 bg-gray-800 text-white rounded-lg shadow-md w-80 text-center">
        <h2 className="text-xl font-semibold">Original Price: ₹{price}</h2>
        <h3 className="text-xl font-semibold text-green-400">
          Discounted Price: ₹{finalPrice}
        </h3>
        <p className="text-sm">Use the coupon code to get {discount}% off!</p>
      </div>

      {/* Coupon Input */}
      <div className="mt-4 flex space-x-2">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          className="px-3 py-2 border rounded-lg text-white"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}

        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          onClick={applyDiscount}
        >
          Apply
        </button>
      </div>

      {/* Receipt Display */}
      {isCouponApplied && (
        <div className="mt-6 p-6 bg-white text-gray-800 rounded-lg shadow-md w-80 text-center">
          <h2 className="text-xl font-semibold">Receipt</h2>
          <p className="text-lg">Original Price: ₹{price}</p>
          <p className="text-lg text-green-500">Discount: {discount}%</p>
          <p className="text-lg font-bold">Total: ₹{finalPrice}</p>
        </div>
      )}

      {/* Buy Now Button */}
      <Link to='/app/payment'>
      <button
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold shadow-lg"
        
      >
        Buy Now
      </button>
      </Link>

      <p className="mt-6 text-gray-500">Subscribe now and elevate your experience!</p>
    </div>
  );
};

export default Gold;