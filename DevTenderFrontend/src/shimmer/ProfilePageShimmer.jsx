import React from "react";

const ProfilePageShimmer = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-8 rounded-lg shadow-lg bg-gray-300 animate-pulse">
        {/* Profile Image Shimmer */}
        <div className="w-40 h-40 rounded-full bg-gray-400 mx-auto mb-4"></div>

        {/* Name Shimmer */}
        <div className="h-6 w-3/4 bg-gray-400 mx-auto mb-4 rounded"></div>

        {/* Details Shimmer */}
        <div className="h-4 w-2/3 bg-gray-400 mx-auto mb-2 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-400 mx-auto mb-2 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-400 mx-auto mb-2 rounded"></div>

        {/* About Section Shimmer */}
        <div className="h-6 w-1/2 bg-gray-400 mx-auto mt-4 rounded"></div>
        <div className="h-4 w-4/5 bg-gray-400 mx-auto mt-2 rounded"></div>
        <div className="h-4 w-4/5 bg-gray-400 mx-auto mt-2 rounded"></div>
      </div>
    </div>
  );
};

export default ProfilePageShimmer;
