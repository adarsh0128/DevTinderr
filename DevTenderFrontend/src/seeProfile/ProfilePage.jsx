import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useSelector } from "react-redux";
import Shimmer from "../shimmer/ProfilePageShimmer"; // Shimmer Component

const ProfilePage = () => {
  const { id } = useParams(); // Get user ID from URL
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme } = useSelector((store) => store.theme);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/${id}`, { withCredentials: true });

        if (response.data) {
          setProfile(response.data.user);
          setPosts(response.data.posts);
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  // Show shimmer when loading
  if (loading) return <Shimmer />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 ${
        theme === "dark"
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-black"
          : "bg-gray-900 text-white"
      }`}
    >
      {/* User Profile Card */}
      <div className="w-96 p-8 rounded-lg shadow-lg bg-white text-black">
        <img
          className="w-40 h-40 rounded-full mx-auto border border-gray-300"
          src={profile.photoUrl || "/default-avatar.png"}
          alt={`${profile.firstName} ${profile.lastName}`}
        />
        <h2 className="text-2xl font-bold text-center mt-4">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-center text-gray-600">{profile.skills?.join(", ")}</p>
        <p className="text-center font-semibold text-lg mt-2">🔯 About</p>
        <p className="text-gray-700 text-sm text-center">{profile.about || "No bio available"}</p>
        
        <div className="mt-4">
          <p><strong>Email:</strong> {profile.emailId}</p>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="w-full max-w-2xl mt-8">
        <h2 className="text-xl font-bold text-center">📢 Posts</h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No posts available</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-white text-black p-4 rounded-lg shadow-md mt-4">
              <p className="font-semibold">{post.caption}</p>
              
              {post.mediaType === "image" && (
                <img className="w-full h-auto rounded-lg mt-2" src={post.mediaUrl} alt="Post media" />
              )}

              {post.mediaType === "video" && (
                <video controls className="w-full rounded-lg mt-2">
                  <source src={post.mediaUrl} type="video/mp4" />
                </video>
              )}

              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <p>👍 {post.likes.length} Likes</p>
                <p>💬 {post.comments.length} Comments</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
