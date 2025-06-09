import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant'; // Adjust the import path if needed
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa'; // You can use these icons
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2'; // For mute/unmute functionality
import { useSelector } from 'react-redux'; // Assuming you're using Redux to manage theme

const GetDataCommentLike = ({ postId }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loadingLikes, setLoadingLikes] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [error, setError] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const { theme } = useSelector((store) => store.theme); // Retrieve theme from Redux

  // Fetch likes from the server
  const fetchLikes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/like/post/${postId}`, { withCredentials: true });
      setLikes(response.data.data);
      setLoadingLikes(false);
    } catch (err) {
      setError('Error fetching likes.');
      setLoadingLikes(false);
    }
  };

  // Fetch comments from the server
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comment/post/${postId}`, { withCredentials: true });
      setComments(response.data.data);
      setLoadingComments(false);
    } catch (err) {
      setError('Error fetching comments.');
      setLoadingComments(false);
    }
  };

  // Fetch likes and comments on component mount
  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [postId]);

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    // You can add logic to handle the like functionality here
  };

  const handleMuteToggle = () => {
    setIsMuted((prev) => !prev);
  };

  if (loadingLikes || loadingComments) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={`relative  border rounded-lg shadow-md mx-auto flex flex-col ${
        theme === 'dark'
          ? 'bg-gradient-to-l to left from-[#7DC387] to-[#DBE9EA] text-gray-800'
          : 'bg-gray-900 text-white'
      }`}
    >
      {/* Video Element (If applicable) */}
      <div className="relative h-full">
        <video
          className="object-cover rounded-lg w-full h-full"
          loop
          muted={isMuted}
        />
        {/* Mute/Unmute Button */}
        <button
          onClick={handleMuteToggle}
          className="text-3xl absolute right-5 top-5 hover:bg-gray-200 hover:text-black px-1 py-1 rounded-full"
        >
          {!isMuted ? <HiOutlineSpeakerWave /> : <HiOutlineSpeakerXMark />}
        </button>
      </div>

      {/* Like and Comment Buttons */}
      <div className="absolute flex top-5 ml-5  items-center">
        <button onClick={handleLikeClick} className="text-lg  bg-transparent flex items-center">
          {isLiked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="white" />}
          <span className="ml-2 text-white">{likes.length || 0}</span>
        </button>
        <button className="text-lg ml-5 bg-transparent flex items-center text-white">
          <FaComment size={30} />
          <span className="ml-2 text-white">{comments.length || 0}</span>
        </button>
      </div>

      {/* Likes Section */}
      {/* <div className="mt-4">
        <h3 className="text-xl font-semibold">Likes</h3>
        <div>
          {likes.length === 0 ? (
            <p>No likes yet.</p>
          ) : (
            <ul>
              {likes.map((like) => (
                <li key={like._id} className="flex items-center gap-2">
                  <img
                    src={like.user.photoUrl}
                    alt={like.user.firstName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{like.user.firstName} {like.user.lastName}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div> */}

      {/* Comments Section */}
      <div className="mt-4 overflow-y-auto max-h-48">
        <h3 className="text-xl font-semibold">Comments</h3>
        <div>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment._id} className="flex items-center gap-2">
                  <img
                    src={comment.userId.photoUrl}
                    alt={comment.userId.firstName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>
                    {comment.userId.firstName} {comment.userId.lastName}: {comment.commentText}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetDataCommentLike;
