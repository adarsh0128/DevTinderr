import axios from "axios";
import { BASE_URL } from '../utils/Constant';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addConnections } from '../utils/connectionSlice';
import CardConnection from "./CardConnection";
import ShimmerRequest from "../shimmer/ShimmerRequest";


const Connection = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((store) => store.theme);
  const userSelector = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);

  const showConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    showConnection();
  }, []);

  const totalConnections = userSelector ? userSelector.length : 0;

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
      <div className={`flex items-center justify-center min-h-screen bg-base-100 p-4 ${
        theme === 'dark'
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-base-100 text-white"
      }`}>
        <div className={`rounded-lg shadow-lg p-8 text-center ${
        theme === 'dark'
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-base-300 text-white"
      }`}>
          <h2 className="text-3xl font-bold text-gray-600 mb-4">
            No Connections Available
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            It looks like you haven't made any connections yet.
          </p>
          <p className="text-md text-gray-500 mb-6">
            Start connecting with others to grow your professional network and open up new opportunities!
          </p>
          <img
            src="https://via.placeholder.com/200"
            alt="No Connections"
            className="w-40 h-40 object-contain mx-auto mb-4"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Explore Users
          </button>
          <div className="mt-4 text-sm text-gray-500">
            <p>Join groups, attend events, and connect with like-minded individuals.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-base-100 min-h-screen flex flex-col items-center gap-6 ${
    theme === "dark"
        ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
        : "bg-gray-900 text-white"
    }`}>
      <div className="text-center my-4">
        <h2 className="text-2xl font-bold text-gray-400">
          Total Connections: {totalConnections}
        </h2>
      </div>
      {userSelector.map((user, index) => (
        <CardConnection key={index} user={user} />
      ))}
    </div>
  );
};

export default Connection;
