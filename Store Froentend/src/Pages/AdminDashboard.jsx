import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { backendUrl, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState("");
  const [stores, setStores] = useState("");
  const [admin, setAdmin] = useState("");
  const [totalStores, setTotalStores] = useState("");
  const [alluser, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [showRatings, setShowRatings] = useState(false);
  const [avgStoreRatings, setAvgStoreRatings] = useState([]);
  const [totalRatings, setTotalRatings] = useState(); // NEW

  const total_users = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/numberofuser`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        console.log(data)
        setStores(data.data[0].count);
        setAdmin(data.data[1].count);
        setUsers(data.data[2].count);
      }
    } catch (error) {
      //console.error("Axios Error:", error);
      alert("Error!!");
    }
  };

  const total_stores = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/total-stores`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setTotalStores(data.data[0].count);
      }
    } catch (error) {
      //console.error("Axios Error:", error);
      alert("Error!!");
    }
  };

  const allUser = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/all-user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAllUsers(data.data);
        setFilteredUsers(data.data);
      }
    } catch (error) {
      //console.log(error);
      alert("Error!!");
    }
  };

  const fetchRatings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/ratings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setRatings(data.data);
        //console.log(data.data);
      }
    } catch (error) {
      //console.log("Catch block ratings", error);
      alert("Error!!");
    }
  };

  useEffect(() => {
    allUser();
    total_users();
    total_stores();
    fetchRatings();
  }, []);

  const handleAddUserRedirect = () => navigate("/add-user");
  const handleAddStoreRedirect = () => navigate("/add-store");

  const handleFilter = (role) => {
    if (role === "all") {
      setFilteredUsers(alluser);
    } else {
      setFilteredUsers(alluser.filter((u) => u.role === role));
    }
  };

  const handleRatingsClick = async () => {
    if (!showRatings) {
      await fetchRatings();
    }
    setShowRatings(!showRatings);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">
        ⚡ Admin Dashboard
      </h1>

      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={handleAddUserRedirect}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          ➕ Add New User
        </button>
        <button
          onClick={handleAddStoreRedirect}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🏬 Add New Store
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div
              onClick={() => handleFilter("user")}
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition"
            >
              <p className="text-gray-500">Total Users</p>
              <p className="text-3xl font-bold">{users}</p>
            </div>
            <div
              onClick={() => handleFilter("store")}
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition"
            >
              <p className="text-gray-500">Store Owners</p>
              <p className="text-3xl font-bold">{stores}</p>
            </div>
            <div
              onClick={() => navigate("/admin-stores")}
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition"
            >
              <p className="text-gray-500">Total Stores</p>
              <p className="text-3xl font-bold">{totalStores}</p>
            </div>
            <div
              onClick={() => handleFilter("admin")}
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition"
            >
              <p className="text-gray-500">Admins</p>
              <p className="text-3xl font-bold">{admin}</p>
            </div>
            <div
              onClick={handleRatingsClick}
              className="bg-white shadow rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition"
            >
              <p className="text-gray-500">Ratings</p>
              <p className="text-3xl font-bold">{ratings.length}</p>
              <p className="text-xs text-blue-600 mt-1">
                {showRatings ? "Hide" : "View"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt={user.name}
                  className="h-20 w-20 mx-auto rounded-full object-cover"
                />
                <h2 className="mt-3 text-lg font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-1 text-xs font-medium text-blue-600 uppercase">
                  {user.role} {user.role === "store" && "Owner"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {showRatings && (
          <div className="lg:w-1/2 bg-white rounded-xl shadow overflow-x-auto">
            <h2 className="text-2xl font-bold text-center py-4">All Ratings</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Store</th>
                  <th className="px-6 py-3 text-left">Rating</th>
                  <th className="px-6 py-3 text-left">Comment</th>
                  <th className="px-6 py-3 text-left">Avg Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ratings.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{r.user_name}</td>
                    <td className="px-6 py-4">{r.store_name}</td>
                    <td className="px-6 py-4 text-yellow-500">
                      {"★".repeat(r.rating)}{" "}
                      <span className="text-gray-400">
                        {"★".repeat(5 - r.rating)}
                      </span>
                    </td>
                    <td className="px-6 py-4 italic">{r.comment}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">
                      {Number(r.avg_rating).toFixed(1)} / 5
                    </td>
                  </tr>
                ))}
                {ratings.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No ratings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
