import React from "react";

const Shimmer = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-20 z-50">
      {/* Loading GIF */}
      <div className="mb-6">
        <img
          src="https://res.cloudinary.com/deddyojnd/image/upload/v1740577563/KAMAL_yuzkwc.gif"
          alt="Loading Animation"
          className="w-72 h-72 object-cover rounded-full shadow-lg"
        />
      </div>

      {/* Text Message */}
      <h1 className="text-xl font-semibold text-gray-700 mb-2">Fetching Data...</h1>
      <p className="text-gray-500">Please wait while we process your request.</p>

      {/* Shimmer Effect */}
      <div className="mt-6 w-48 h-4 bg-gray-300 rounded-lg overflow-hidden relative">
        <div className="w-1/3 h-full bg-gray-400 absolute left-0 animate-shimmer"></div>
      </div>
    </div>
  );
};

export default Shimmer;