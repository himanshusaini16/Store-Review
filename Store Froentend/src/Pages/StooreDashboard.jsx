import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const StoreDashboard = () => {
  const { backendUrl, token } = useContext(AuthContext);
  const [store, setStore] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRating, setTotalRating] = useState(0);

  const fetchStore = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/store-owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setStore(data.data[0]);
        //console.log("Owner Store",data)
      }
    } catch (error) {
      //console.error("Error fetching store:", error);
      alert("Error!!");
    }
  };

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/avg-owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAvgRating(data.averageRating);
        //console.log("Rating",data)
        setReviews(data.reviews);
        //console.log("Reviws",data.reviews.length)
        setTotalRating(data.reviews.length);
      }
    } catch (error) {
      //console.error("Error fetching ratings:", error);
      alert("Error!!");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchStore();
      await fetchRatings();
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Store Owner Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500 mb-2">Store Name</p>
          <p className="text-xl font-semibold">{store?.name || "N/A"}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500 mb-2">Average Rating</p>
          <p className="text-yellow-500 font-semibold text-xl">
            ⭐ {avgRating}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500 mb-2">Location</p>
          <p className="text-xl font-semibold">{store?.address || "N/A"}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center">
          <p className="text-gray-500 mb-2">Total Ratings</p>
          <p className="text-xl font-semibold">{totalRating}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">Store</th>
              <th className="px-6 py-3 text-left">Rating</th>
              <th className="px-6 py-3 text-left">Comment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reviews ? (
              reviews.map((review, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{review.user_name}</td>
                  <td className="px-6 py-4">{review.store_name}</td>
                  <td className="px-6 py-4">⭐ {review.rating}</td>
                  <td className="px-6 py-4">{review.comment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No ratings yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreDashboard;
