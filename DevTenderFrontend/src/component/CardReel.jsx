import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaRegHeart, FaComment } from "react-icons/fa";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

const CardReel = ({
  reel,
  likeCount,
  commentCount,
  newComment,
  setNewComment,
  handleLike,
  handleCommentSubmit,
  globalMute,
  onUnmute,
  currentVideo,
  index,
}) => {
  const [showCommentSidebar, setShowCommentSidebar] = useState(false);
  const [isLiked, setIsLiked] = useState(likeCount[reel._id] > 0);
  const [comments, setComments] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(globalMute);
  const videoRef = useRef(null);
  const { theme } = useSelector((store) => store.theme);

  const { ref, inView } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      setIsPlaying(inView && currentVideo === index);
    },
  });

  // Fetch comments when sidebar is opened
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/comments/reel/${reel._id}`);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentClick = () => {
    setShowCommentSidebar((prev) => !prev);
    if (!showCommentSidebar) {
      fetchComments();
    }
  };

  const handleLikeClick = () => {
    setIsLiked((prev) => !prev);
    handleLike(reel._id);
  };

  const handleFirstUnmute = () => {
    if (isMuted) {
      videoRef.current.muted = false; // Unmute the current video
      setIsMuted(false);
      onUnmute(); // Unmute all videos
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const pauseVideo = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((error) => {
          console.warn("Autoplay failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div ref={ref} className="relative h-screen border rounded-lg shadow-md mx-auto flex flex-col">
      {/* Video Element */}
      <div className="relative h-full">
        <video
          ref={videoRef}
          src={reel?.mediaUrl}
          className="object-cover rounded-lg w-full h-full"
          loop
          muted={isMuted}
          onClick={pauseVideo}
        />
        {/* Mute/Unmute Button */}
        <button
          onClick={handleFirstUnmute}
          className="text-3xl absolute right-5 top-5 hover:bg-gray-200 hover:text-black px-1 py-1 rounded-full"
        >
          {!isMuted ? <HiOutlineSpeakerWave /> : <HiOutlineSpeakerXMark />}
        </button>
      </div>

      {/* Like and Comment Buttons */}
      <div className="absolute bottom-60 right-5 space-y-6 items-center">
        <button onClick={handleLikeClick} className="text-lg bg-transparent flex items-center">
          {isLiked ? <FaHeart size={30} color="red" /> : <FaRegHeart size={30} color="white" />}
          <span className="ml-2 text-white">{likeCount[reel._id] || reel.likesCount}</span>
        </button>
        <button onClick={handleCommentClick} className="text-lg bg-transparent flex items-center text-white">
          <FaComment size={30} />
          <span className="ml-2">{commentCount[reel._id] || reel.commentsCount}</span>
        </button>
      </div>

      {/* User Info */}
      <div className="absolute bottom-7 left-5 text-white flex items-center space-x-2">
        <img
          src={reel?.user?.photoUrl}
          alt="User photo"
          className="w-10 h-10 rounded-full object-cover"
        />
        <p className="font-semibold">
          {reel.user.firstName} {reel.user.lastName}
        </p>
      </div>

      {/* Sidebar for Comments */}
      {showCommentSidebar && (
        <div
          className={`fixed top-0 right-0 h-auto w-80 bg-gray-900 text-white p-4 shadow-lg transition-transform transform translate-x-0 ${
            theme === "dark"
              ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
              : "bg-gray-900 text-white"
          }`}
        >
          <button onClick={handleCommentClick} className="text-right text-red-500 text-xl">
            ✖
          </button>
          <h2 className="text-lg font-semibold">Comments</h2>
          <p className="text-sm text-red-500">{"Total comments: " + comments?.length}</p>

          {/* Comment Input */}
          <div className="mt-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-2 border text-black rounded-md"
            />
            <button
              onClick={() => handleCommentSubmit(reel._id)}
              className="mt-2 w-full py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Post Comment
            </button>
          </div>

          {/* Render Comments */}
          <div
            className={`mt-4 space-y-2 max-h-80 overflow-y-auto ${
              theme === "dark"
                ? "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
                : "bg-gray-900 text-white"
            }`}
          >
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 rounded-md space-x-4 hover:bg-gray-700 transition duration-200 ease-in-out"
                >
                  {/* User's Profile Picture */}
                  <img
                    src={comment?.userId?.photoUrl}
                    alt="Commenter's profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {/* Comment Text */}
                  <div className="space-y-1">
                    <p className="font-semibold">
                      {comment?.userId?.firstName} {comment?.userId?.lastName}
                    </p>
                    <p>{comment.commentText}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardReel;