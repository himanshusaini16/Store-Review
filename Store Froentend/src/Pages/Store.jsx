import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Store = () => {
  const { storeid } = useParams();
  const { backendUrl, token, user } = useContext(AuthContext);

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const [ratings, setRatings] = useState([]);

  const fetchStore = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/stores/${storeid}`
      );
      if (data.success) {
        setStore(data.data[0]);
      }
    } catch (err) {
      //console.error("Error fetching store:", err);
      setError("Failed to fetch store");
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/all-ratings/${storeid}`
      );
      if (data.success) {
        setRatings(data.data);
      }
    } catch (err) {
      //console.error("Error fetching ratings:", err.message);
      alert("Error!!");
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("⚠️ Please login to submit a rating.");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/ratings`,
        {
          store_id: storeid,
          user_id: user?.id,
          rating,
          comment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setMessage("✅ Rating submitted!");
        setRating(0);
        setComment("");
        fetchRatings();
      } else {
        setMessage("⚠️ " + data.message);
      }
    } catch (err) {
      //console.error(err);
      setMessage("❌ Failed to submit rating");
    }
  };

  useEffect(() => {
    fetchStore();
    fetchRatings();
  }, [storeid]);

  if (loading)
    return <p className="text-center text-gray-500">Loading store...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      {store ? (
        <>
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-10">
            <img
              src={
                store.image ||
                "https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg"
              }
              alt={store.name}
              className="w-full h-100 object-cover"
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {store.name}
              </h2>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">📌 Description:</span>{" "}
                {store.description || "No description"}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">📍 Address:</span>{" "}
                {store.address || "No address provided"}
              </p>
              <p className="text-gray-700 text-lg mb-2">
                <span className="font-semibold">👤 Owner:</span>{" "}
                {store.owner_name}
              </p>
              <p className="text-gray-500 text-md">
                <span className="font-semibold">⏰ Created At:</span>{" "}
                {new Date(store.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-10">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              ⭐ Leave a Rating
            </h3>
            <form
              onSubmit={handleRatingSubmit}
              className="flex flex-col gap-5 max-w-lg mx-auto"
            >
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setRating(num)}
                    className={`w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-all ${
                      rating >= num
                        ? "bg-yellow-400 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-500 hover:bg-yellow-100"
                    }`}
                  >
                    ⭐
                  </button>
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
                className="p-3 border rounded-lg w-full resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-[100px]"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all hover:scale-[1.02]"
              >
                Submit Rating
              </button>

              {message && (
                <p className="text-center mt-2 text-sm font-medium text-gray-700">
                  {message}
                </p>
              )}
            </form>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              💬 Customer Reviews
            </h3>
            {ratings.length === 0 ? (
              <p className="text-gray-500">No ratings yet.</p>
            ) : (
              <div className="space-y-4">
                {ratings.map((r) => (
                  <div
                    key={r.id}
                    className={`p-4 border rounded-lg shadow-sm ${
                      r.user_id === user?.id ? "bg-blue-50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-gray-800">
                        {r.user_name}{" "}
                        <span className="text-sm text-gray-500">
                          ({r.user_email})
                        </span>
                      </h4>
                      <span className="text-yellow-500 font-bold">
                        ⭐ {r.rating}/5
                      </span>
                    </div>
                    <p className="text-gray-700">{r.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No store found</p>
      )}
    </div>
  );
};

export default Store;
