import React from "react";
import {Link} from 'react-router-dom'

const Prelogin = () => {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="text-center lg:text-left">
          <h3 className="text-orange-400 text-xl mb-4">
            A SOCIAL MEDIA FOR DEVELOPERS
          </h3>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Match with <span className="text-blue-500">Developers</span>
            <br />
            who inspire
          </h1>
          <p className="text-green-500 text-lg mb-8">
            Swipe into the world of developers.
          </p>
          <div>
            <Link to="/login">
            <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md text-lg shadow-lg hover:bg-yellow-500 transition duration-300">
              Join for free
            </button>
            </Link>
            <p className="mt-4">
              Already joined us?{" "}
              <Link to="/login">
              <a href="#login" className="text-blue-500 hover:underline">
                Log in
              </a>
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-2 gap-4 items-center justify-center lg:w-1/2">
          {/* Images and Shapes */}
          <div className="relative">
            <img
              src="https://dev-tinder-di9z.vercel.app/assets/hero-DOyQGsz-.png"
              alt="Person 1"
              className="rounded-full w-full border-4 border-yellow-400"
            />
          </div>
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHm0R27Vs2L4nOkncGMMOn3OSr-vocAUdqUQ&s"
              alt="Person 2"
              className="rounded-full w-full border-4 border-blue-500"
            />
          </div>
          <div className="bg-black rounded-full w-full h-32 flex items-center justify-center text-white">
            {/* Placeholder shape */}
          </div>
          <div className="bg-yellow-400 rounded-full w-full h-32"></div>
          <div className="bg-red-400 rounded-full w-8 h-8 absolute top-2 left-10"></div>
          <div className="bg-green-300 rounded-full w-32 h-32"></div>
        </div>
      </div>
    </div>
  );
};

export default Prelogin;
