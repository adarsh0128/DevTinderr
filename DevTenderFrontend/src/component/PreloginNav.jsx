import { Link } from "react-router-dom";

const PreloginNav = () => {
  return (
    <nav className="bg-black text-white px-4 py-3 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwhe-DMYPmx0Gpwxa0ovml9rLOQneU6yq6g&s"
            alt="DevTender Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-2xl font-bold hover:text-gray-300">DevTinder</span>
        </Link>
        
        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/more" className="hover:text-gray-300">
              More
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          </li>
        </ul>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            menu.classList.toggle("hidden");
          }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-black">
        <ul className="flex flex-col space-y-4 p-4 font-medium">
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/more" className="hover:text-gray-300">
              More
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default PreloginNav;
