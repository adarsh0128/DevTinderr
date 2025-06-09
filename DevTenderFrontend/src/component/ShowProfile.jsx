import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ShowProfile = ({ user }) => {
  const { theme } = useSelector((store) => store.theme);

  return (
    user && (
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark"
            ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
            : "bg-base-100 text-white"
        }`}
      >
        <div
          className={`w-full max-w-lg rounded-lg shadow-md p-6 ${
            theme === "dark"
              ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
              : "bg-base-300 text-white"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-500">
                Photo
              </label>
              <img
                src={user.photoUrl || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="mt-2 w-32 h-32 rounded-full object-cover border-2 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                First Name
              </label>
              <p className="mt-1 text-gray-700">{user.firstName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Last Name
              </label>
              <p className="mt-1 text-gray-700">{user.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Age
              </label>
              <p className="mt-1 text-gray-700">
                {user.age || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Skills
              </label>
              <p className="mt-1 text-gray-700">
                {user.skills?.join(", ") || "No skills listed"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                About
              </label>
              <p className="mt-1 text-gray-700">{user.about}</p>
            </div>
            <div className="mt-6">
              <Link
                to="/app/EditProfile"
                className="block w-full px-4 py-2 bg-blue-600 text-center text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ShowProfile;
