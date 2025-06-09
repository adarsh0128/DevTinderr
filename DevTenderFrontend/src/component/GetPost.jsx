import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useSelector } from "react-redux";
import { Heart, MessageCircle } from "lucide-react"; // Add icons
import GetDataCommentLike from "./GetDataCommentLike";
import ShimmerFeed from "../shimmer/ShimmerFeed";
import { Link } from "react-router-dom";

const GetPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [likedPosts, setLikedPosts] = useState([]);
  const [showCommentSection, setShowCommentSection] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loadingshimmer, setLoadingshimmer] = useState(true);

  const { theme } = useSelector((store) => store.theme); // Get the current theme from Redux

  // Fetch posts from the backend
  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${BASE_URL}/posts`, {
        withCredentials: true,
      });
      setPosts(response.data.posts);
      console.log(response.data.posts);

      // Update posts state
      setLoadingshimmer(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching posts.");
    } finally {
      setLoading(false);
    }
  };

  // Handle like button click
  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(
        `${BASE_URL}/like/post/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Update the likedPosts state
      setLikedPosts((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );

      // Update the post's likes count in the UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likesCount:
                  typeof post.likesCount === "number" ? post.likesCount + 1 : 1,
              }
            : post
        )
      );

      console.log(response.data.message); // Log success message
    } catch (err) {
      console.error("Error liking post:", err);
      setError("Failed to like post. Please try again.");
    }
  };

  // Handle comment button click
  const handleComment = (postId) => {
    setShowCommentSection((prev) => (prev === postId ? null : postId));
  };

  // Handle comment submission
  const handleCommentSubmit = async (postId) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from local storage
      const response = await axios.post(
        `${BASE_URL}/comment/post/${postId}`,
        { commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Update the post's comments count in the UI
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, commentsCount: post.commentsCount + 1 }
            : post
        )
      );

      // Clear the comment input
      setCommentText("");
      setShowCommentSection(null); // Optionally close the comment section after submission

      console.log(response.data.message);
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Failed to post comment. Please try again.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loadingshimmer) return <ShimmerFeed />;

  return (
    <div
      className={`h-full m-auto p-6 ${
        theme === "dark"
          ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
          : "bg-gray-900 text-white"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">All Posts</h2>

      {loading && <p className="text-center">Loading posts...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className={`p-4 w-full sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/5 mx-auto rounded-lg shadow-md ${
              theme === "dark"
                ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
                : "bg-gray-800 text-white"
            }`}
          >
            {post.mediaType === "image" ? (
              <img
                src={post.mediaUrl}
                alt={post.caption}
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
            )}
            <p className="text-lg font-semibold">{post.caption}</p>

            <p className="text-sm text-gray-400">
              Posted by:{" "}
              {post.user && (
                <Link
                  to={`/app/profile/${post.user._id}`}
                  className="text-blue-400 hover:underline"
                >
                  {post.user.firstName} {post.user.lastName}
                </Link>
              )}
            </p>

            {/* Like and Comment buttons */}
            <div className="flex items-center gap-6 mt-4">
              <button
                className={`flex items-center gap-2 ${
                  likedPosts.includes(post._id)
                    ? "text-red-500"
                    : "text-blue-500"
                } hover:text-blue-700 transition`}
                onClick={() => handleLike(post._id)}
              >
                <Heart className="w-5 h-5" />
                <span>Like ({post.likesCount})</span>
              </button>

              <button
                className="flex items-center gap-2 text-green-500 hover:text-green-700 transition"
                onClick={() => handleComment(post._id)}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Comment ({post.commentsCount})</span>
              </button>
            </div>

            {/* Comment Section */}
            {showCommentSection === post._id && (
              <div className="mt-4 p-4 bg-gray-200 rounded-md">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                  onClick={() => handleCommentSubmit(post._id)}
                >
                  Post Comment
                </button>
                <GetDataCommentLike postId={post._id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetPost;
