import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, skills, photoUrl } = user;
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + _id, {}, {
        withCredentials: true,
      });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };



  return (
    
     
      <div className={`flex-grow p-4 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
        <h1 className="text-2xl text-center font-bold m-7">Suggested for you add new friends</h1>
        <div className="flex  justify-center items-center">
          <div className="card w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
            
            
        <figure className="relative w-full">
            <Link to={`/app/profile/${_id}`}>
             <button className="absolute top-2 right-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 transition">
               See Profile
             </button>
             </Link>
          <img
             src={photoUrl}
             alt={`${firstName} ${lastName}`}
            className="w-full h-64 object-cover rounded-lg"
          />
      </figure>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {firstName} {lastName}
              </h2>
              <p className="text-gray-600 mb-2">Age: {age}</p>
              <p className="text-gray-600 mb-4">Skills: {skills}</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => handleSendRequest("interested", _id)}
                >
                  Interested
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => handleSendRequest("ignored", _id)}
                >
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default UserCard;
