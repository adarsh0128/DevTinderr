import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../utils/userSlice';
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EditProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [skills, setSkills] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [gender, setGender] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { theme } = useSelector((store) => store.theme);

  const handleEditProfile = async (e) => {
    e.preventDefault(); // Prevents the form from submitting and page refreshing

    // Convert skills to an array if it's a comma-separated string
    const skillsArray = skills.split(',').map(skill => skill.trim());

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          skills: skillsArray, // Use the skills array
          photoUrl,
          about,
          gender
        },
        {
          withCredentials: true
        }
      );
      dispatch(addUser(res?.data?.data));
      navigate('/app/profile'); // Navigate to the profile page after success
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen bg-base-100 my-5 ${
        theme === 'dark'
          ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gray-900 text-white"
      }`}>
      <div className={`w-full max-w-lg bg-base-300 rounded-lg shadow-md p-6
      ${
        theme === 'dark'
          ? "bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gray-900 text-white"
      }`}>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <h2 className="block text-sm font-medium text-red-400 text-center">all boxes mandatory to fill</h2>
        <form className="space-y-4" onSubmit={handleEditProfile}>
          <div>
            <label className="block text-sm font-medium text-gray-400">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              // required
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              // required
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Age</label>
            <input
              type="number"
              name="age"
              value={age}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              // required
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Gender</label>
            <input
              type="text"
              name="gender"
              value={gender}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              // required
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Skills (comma-separated)</label>
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Photo URL</label>
            <label className="block text-sm font-medium text-red-400">if not have photoUrl then use default photoUrl- https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZxwCJ0PDLfFEpF09-lMCMhFMtCFoTVUJ0Q&s  </label>
            <input
              type="url"
              name="photoUrl"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">About</label>
            <textarea
              name="about"
              value={about}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              rows="4"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
