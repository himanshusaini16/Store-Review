import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const AllStores = () => {
  const { backendUrl, token } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchStores = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/stores`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setStores(data.data);
        //console.log("Stores:", data.data);
      } else {
        //console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      // console.log(error);
      alert("Error!!");
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const filteredStores =
    filter === "all"
      ? stores
      : stores.filter(
          (store) => Math.round(store.avg_rating) === parseInt(filter)
        );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Stores</h1>

      <div className="mb-6 flex justify-end items-center gap-3">
        <label className="text-gray-700 font-medium">Filter by Rating:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="5">5 ★</option>
          <option value="4">4 ★</option>
          <option value="3">3 ★</option>
          <option value="2">2 ★</option>
          <option value="1">1 ★</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src="https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg"
              alt={store.name}
              className="h-50 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {store.name}
              </h2>
              <p className="text-sm text-gray-600">{store.description}</p>
              <p className="mt-2 text-sm text-gray-500">📍 {store.address}</p>
              <p className="mt-1 text-sm text-gray-500">
                👤 Owner: {store.owner_name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                📧 Email: {store.owner_mail}
              </p>
              <p className="mt-2 text-sm font-semibold text-yellow-600">
                ⭐ Avg Rating:{" "}
                {store.avg_rating ? store.avg_rating : "No ratings yet"}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Added on: {new Date(store.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredStores.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No stores found with this rating.
        </p>
      )}
    </div>
  );
};

export default AllStores;
