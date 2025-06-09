import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import CardReel from "./CardReel";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setPaymentStatus } from "../utils/paymentSlice"; // Import the payment slice action

const GetReel = () => {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState({});
  const [commentCount, setCommentCount] = useState({});

  const dispatch = useDispatch();
  const isPaymentDone = useSelector((store) => store.payment.isPaymentDone); // Get payment status from Redux store

  // Fetch all reels from the backend
  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await axios.get(BASE_URL + "/getReels", {
          withCredentials: true,
        });
        setReels(response.data.reels);
        console.log(response.data.reels);

        // Fetch like and comment counts for each reel
        response.data.reels.forEach(async (reel) => {
          const countResponse = await axios.get(`/counts/post/${reel._id}`);
          setLikeCount((prev) => ({
            ...prev,
            [reel._id]: countResponse.data.likeCount,
          }));
          setCommentCount((prev) => ({
            ...prev,
            [reel._id]: countResponse.data.commentCount,
          }));
        });

        setLoading(false);
      } catch (err) {
        setError("Failed to load reels. Please try again.");
        setLoading(false);
      }
    };

    // Only fetch reels if payment is done
    if (isPaymentDone) {
      fetchReels();
    } else {
      setLoading(false);
    }
  }, [isPaymentDone]);

  // Handle like functionality
  const handleLike = async (reelId) => {
    if (!isPaymentDone) {
      toast.info("Please subscribe or pay first to like reels.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/like/reel/${reelId}`,
        {},
        { withCredentials: true }
      );
      setLikeCount((prev) => ({
        ...prev,
        [reelId]: (prev[reelId] || 0) + 1,
      }));
    } catch (err) {
      setError("Failed to like the reel.");
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (reelId) => {
    if (!isPaymentDone) {
      toast.info("Please subscribe or pay first to comment on reels.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (newComment.trim() === "") {
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/comment/reel/${reelId}`,
        { commentText: newComment },
        { withCredentials: true }
      );
      // Update the comment count in the state
      setCommentCount((prev) => ({
        ...prev,
        [reelId]: (prev[reelId] || 0) + 1,
      }));
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">All Reels</h2>

      {loading && <p className="text-center">Loading reels...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Show payment prompt if payment is not done */}
      {!isPaymentDone && (
        <div className=" h-screen text-center">
          <p className="text-xl mb-4">
            Please subscribe or pay to view and interact with reels.
          </p>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold shadow-lg"
            onClick={() => {
              toast.info("Redirecting to payment page...", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setTimeout(() => {
                // Redirect to payment page
                window.location.href = "/app/payment";
              }, 2000);
            }}
          >
            Subscribe Now
          </button>
        </div>
      )}

      {/* Show reels only if payment is done */}
      {isPaymentDone && (
        <div className="flex flex-col space-y-4">
          {reels.map((reel) => (
            <CardReel
              key={reel._id}
              reel={reel}
              likeCount={likeCount[reel._id] || 0}
              commentCount={commentCount[reel._id] || 0}
              newComment={newComment}
              setNewComment={setNewComment}
              handleLike={handleLike}
              handleCommentSubmit={handleCommentSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GetReel;