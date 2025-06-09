import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBell,
  FaCommentDots,
  FaSearch,
  FaThList,
  FaMedal,
  FaCrown,
} from "react-icons/fa";
import {
  MdOutlineVideoCameraFront,
  MdOutlineReportProblem,
} from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { useState } from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useSelector((store) => store.theme);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinks = [
    { path: "/app", label: "Explore", icon: <FaHome size={30} /> },
    {
      path: "/app/connection",
      label: "Connections",
      icon: <FaUser size={30} />,
    },
    {
      path: "/app/notification",
      label: "Notifications",
      icon: <FaBell size={30} />,
    },
    { path: "/app/request", label: "Requests", icon: <FaSearch size={30} /> },
    {
      path: "/app/getreel",
      label: "See Video",
      icon: <MdOutlineVideoCameraFront size={30} />,
    },
    {
      path: "/app/message",
      label: "Messages",
      icon: <FaCommentDots size={30} />,
    },
    { path: "/app/profile", label: "Profile", icon: <FaUser size={30} /> },
    {
      path: "/app/addfile",
      label: "Add Post",
      icon: <MdOutlineReportProblem size={30} />,
    },
    {
      path: "/app/addreel",
      label: "Add Reel",
      icon: <RiVideoAddLine size={30} />,
    },
  ];

  const sidebarStyles = {
    base: `absolute left-0 top-0 z-40 w-64 h-full transform transition-transform duration-300 ${
      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
    } lg:translate-x-0`,
    dark: "bg-gray-900 text-white",
    light: "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800",
  };

  const linkStyles = {
    base: "flex items-center text-xl space-x-2 py-3 px-4 hover:rounded-lg w-full transition-colors duration-200",
    dark: "text-gray-400 hover:bg-gray-700",
    light: "text-gray-600 hover:bg-gray-200",
    active: "font-bold",
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`${sidebarStyles.base} ${
          theme === "light" ? sidebarStyles.dark : sidebarStyles.light
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex flex-col items-start p-6">
          <button
            className="absolute top-4 right-4 lg:hidden"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            Close
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${linkStyles.base} ${
                theme === "dark" ? linkStyles.dark : linkStyles.light
              } ${location.pathname === link.path ? linkStyles.active : ""}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Hamburger Menu for smaller screens */}
      <button
        className="lg:hidden pl-5 absolute  top-[-45px] left-0 z-50"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaThList
          size={24}
          className={theme === "dark" ? "text-gray-800" : "text-white"}
        />
      </button>
    </>
  );
};

export default Sidebar;
