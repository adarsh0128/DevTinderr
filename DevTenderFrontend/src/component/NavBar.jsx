import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMoon,
  FaSun,
  FaUser,
  FaCog,
  FaUsers,
  FaSignOutAlt,
  FaStar,
} from "react-icons/fa"; // Import icons
import { BASE_URL } from "../utils/Constant";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { toggleTheme } from "../utils/themeSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for light/dark mode
  const [isLightMode, setIsLightMode] = useState(true);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle light/dark mode
  const toggleMode = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className={`navbar shadow-md z-50 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gray-900 text-white"
      }`}
    >
      <div className="flex-1">
        <Link to="/app" className="btn btn-ghost text-3xl ml-12 lg:ml-0">
          DevTinder
        </Link>
      </div>

      <div className="flex-none gap-2">
        {/* Gold and Silver Membership */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to="/app/gold">
            <button className="btn btn-ghost text-gold-500">
              <FaStar /> Gold Membership
            </button>
          </Link>
          <Link to="/app/silver">
            <button className="btn btn-ghost text-silver-400">
              <FaStar /> Silver Membership
            </button>
          </Link>
        </div>

        {/* Light/Dark Mode Toggle Button */}
        <button
          className={`btn btn-ghost ${
            theme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-green-500 text-white"
          } transition-colors duration-300`}
          onClick={toggleMode}
        >
          {isLightMode ? <FaMoon /> : <FaSun />}
        </button>

        {/* User Profile and Dropdown */}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Avatar" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <li>
                <Link to="/app/profile" className="justify-between">
                  <FaUser className="mr-2" /> Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/app/connection">
                  <FaUsers className="mr-2" /> See All Connections
                </Link>
              </li>
              <li>
                <Link to="/app/request">
                  <FaUsers className="mr-2" /> Connection Requests
                </Link>
              </li>
              <li>
                <Link to="/app/gold">
                  <FaStar /> Gold Membership
                </Link>
              </li>
              <li>
                <Link to="/app/silver">
                  <FaStar /> Silver Membership
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>
                  <FaSignOutAlt className="mr-2" /> Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
