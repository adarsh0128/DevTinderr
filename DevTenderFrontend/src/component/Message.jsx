import { useSelector } from "react-redux";
import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ShimmerRequest from "../shimmer/ShimmerRequest";

const Message = () => {
  const { theme } = useSelector((store) => store.theme);
  const userSelector = useSelector((store) => store.connections);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${
        theme === 'dark'
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-base-100 text-white"
      }`}>
        <ShimmerRequest />
      </div>
    );
  }

  if (!userSelector || userSelector.length === 0) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
            : "bg-gray-900 text-white"
        }`}
      >
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Message Feature
          </h2>
          <p className="text-gray-500 mb-4">
            This feature is not available at the moment, but we plan to
            introduce it in the future. Stay tuned for updates!
          </p>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Explore Other Features
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gray-900 text-white"
      }`}
    >
      <h1 className="text-3xl font-semibold mt-6 text-gray-300">Messages</h1>
      <div className="grid grid-cols-1  gap-6 p-6">
        {userSelector.map((user) => (
          <div
            key={user._id}
            className="w-96 rounded-[10px] overflow-hidden shadow-lg p-6 bg-white text-gray-800"
          >
            <img
              src={user.photoUrl}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-600">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-500">Age: {user.age}</p>
              <p className="text-gray-500">Gender: {user.gender}</p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-600">Skills:</h3>
              <ul className="flex flex-wrap mt-2">
                {user.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 m-1 rounded-full"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
              <Link
                to={`/app/chat/${user._id}`}
                state={{ firstName: user.firstName, lastName: user.lastName }}
              >
                <div className="mt-5">
                  <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2 rounded-full shadow-md transition duration-300 ease-in-out">
                    <MdOutlineMessage className="text-lg" /> Chat
                  </button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
