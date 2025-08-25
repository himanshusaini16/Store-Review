import React, { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const { backendUrl, token } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/register`,
        {
          name,
          email,
          password,
          role,
          address
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        alert(`User ${data.user.name} added successfully!`);
        setName("");
        setEmail("");
        setPassword("");
        setAddress("")
        setRole("user");
        navigate("/admin-dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      // console.error(error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Add New User</p>

        <div className="w-full">
          <p>Full Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            required
          />
        </div>

        <div className="w-full">
          <p>Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>

        <div className="w-full">
          <p>Address</p>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
          />
        </div>

        <div className="w-full">
          <p>Role</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          >
            <option value="user">User</option>
            <option value="store">Store Owner</option>
            <option value="admin">System Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded-md text-base hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default AddUserForm;
