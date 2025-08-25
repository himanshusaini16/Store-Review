import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Alluser = () => {
  const { backendUrl, token } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  const users = async () => {
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
      alert("Error!!")
    }
  };

  useEffect(() => {
    users();
  }, []);

  useEffect(() => {
    let filtered = allUsers.filter((user) => {
      return (
        user.name?.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.email?.toLowerCase().includes(filters.email.toLowerCase()) &&
        (user.address
          ? user.address.toLowerCase().includes(filters.address.toLowerCase())
          : true) &&
        (filters.role ? user.role === filters.role : true)
      );
    });

    setFilteredUsers(filtered);
  }, [filters, allUsers]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Users</h1>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="email"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Filter by Address"
          value={filters.address}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        />

        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="store">Store Owner</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt={user.name}
              className="h-20 w-20 mx-auto rounded-full object-cover"
            />

            <div className="text-center mt-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500">
                {user.address || "No address provided"}
              </p>
              <p className="mt-1 text-xs font-medium text-blue-600 uppercase">
                {user.role}
              </p>
            </div>

            <p className="text-xs text-gray-400 mt-2 text-center">
              Joined: {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alluser;
