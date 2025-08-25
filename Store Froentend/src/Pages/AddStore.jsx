import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { data } from "react-router-dom";

const AddStore = () => {
  const { backendUrl, token } = useContext(AuthContext);
  const [storeOwners, setStoreOwners] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    owner_id: "",
  });
  const fetchStoreOwners = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/store-owner`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setStoreOwners(data.data);
      } else {
        // console.log(data.message);
        alert(data.message);
      }
    } catch (error) {
      //console.log("❌ Error fetching store owners", error);
      alert("Something went Wrong!!");
    }
  };

  useEffect(() => {
    if (token) {
      fetchStoreOwners();
    }
  }, [token]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-store`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        alert("✅ Store added successfully!");
        //console.log("Store created:", data);
        setFormData({ name: "", description: "", address: "", owner_id: "" });
      } else {
        alert("⚠️ Failed to add store: " + data.message);
      }
    } catch (error) {
      //console.log("❌ Error adding store", error);
      alert("❌ Error adding store");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow-md space-y-5 bg-white"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        ➕ Add New Store
      </h2>
      <div>
        <label className="block mb-1 font-medium">Store Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter store name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-green-300 outline-none"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          placeholder="Enter store description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-green-300 outline-none"
          rows="3"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter store address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-green-300 outline-none"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Store Owner</label>
        <select
          name="owner_id"
          value={formData.owner_id}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-green-300 outline-none"
          required
        >
          <option value="">-- Select Owner --</option>
          {storeOwners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name} (ID: {owner.id})
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
      >
        Add Store
      </button>
    </form>
  );
};

export default AddStore;
