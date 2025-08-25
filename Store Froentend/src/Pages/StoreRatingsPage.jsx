import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

const StoreRatingsPage = () => {
  const { backendUrl, token } = useContext(AuthContext);
  const [filter, setFilter] = useState("all");
  const [reviews, setReviews] = useState([]); // ✅ FIXED
  const [avgRating, setAvgRating] = useState(0);

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/avg-owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAvgRating(data.averageRating || 0);
        //console.log("Rating", data.averageRating);

        setReviews(data.reviews || []);
        //console.log("Reviews", data.reviews);
      }
    } catch (error) {
      //console.error("Error fetching ratings:", error);
      alert("Error!!");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  const filteredRatings =
    filter === "all"
      ? reviews
      : reviews.filter((r) => r.rating === parseInt(filter));

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Store Ratings</h1>

      <div className="max-w-3xl mx-auto mb-8 bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500">Average Rating</p>
        <p className="text-yellow-500 text-3xl font-semibold">⭐ {avgRating}</p>
      </div>

      <div className="max-w-3xl mx-auto mb-6 flex justify-end gap-4">
        <label className="text-gray-700 font-medium">Filter by Rating:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="5">5⭐</option>
          <option value="4">4⭐</option>
          <option value="3">3⭐</option>
          <option value="2">2⭐</option>
          <option value="1">1⭐</option>
        </select>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Rating</th>
              <th className="px-6 py-3 text-left">Comment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRatings.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4">{r.user_name}</td>
                <td className="px-6 py-4">⭐ {r.rating}</td>
                <td className="px-6 py-4">{r.comment}</td>
              </tr>
            ))}
            {filteredRatings.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  No ratings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreRatingsPage;
