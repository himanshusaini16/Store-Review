import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser, backendUrl, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const userid = user[0].id;

  const [name, setName] = useState(user?.[0]?.name || "");
  const [email, setEmail] = useState(user?.[0]?.email || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(user?.[0]?.image || "");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState(user?.[0]?.address || "");

  const [showReset, setShowReset] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("address", address);
      if (image) formData.append("image", image);

      const { data } = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setUser(data.user); // update global context
        setIsEdit(false);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      //console.error("Update error:", error.message);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // console.log("Profile",user)

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/user/reset-password`,
        {
          userId: user[0]?.id,
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        alert("Password updated successfully!");
        setShowReset(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || "Failed to reset password");
      }
    } catch (error) {
      //console.error("Reset error:", error.message);
      alert("Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    user && (
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
                src={
                  preview ||
                  "data:image/jpeg;base64,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"
                }
                alt="Profile"
              />
              <input
                type="file"
                id="image"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-500"
              src={
                user[0]?.image ||
                "data:image/jpeg;base64,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"
              }
              alt="Profile"
            />
          )}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium">Full Name</label>
          {isEdit ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md bg-gray-50"
            />
          ) : (
            <p className="mt-1 text-lg font-semibold">{user[0]?.name}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Email</label>
          {isEdit ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md bg-gray-50"
            />
          ) : (
            <p className="mt-1 text-lg font-semibold text-blue-600">
              {user[0]?.email}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Address</label>
          {isEdit ? (
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md bg-gray-50"
            />
          ) : (
            <p className="mt-1 text-lg font-semibold text-gray-600">
              {user[0]?.address}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Role</label>
          <p className="mt-1 text-md">{user[0]?.role}</p>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          {isEdit ? (
            <>
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="mt-8 text-center">
          {!showReset ? (
            <button
              onClick={() => setShowReset(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          ) : (
            <div className="mt-4 bg-gray-50 p-5 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                Reset Password
              </h3>
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mb-2 w-full p-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mb-2 w-full p-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-3 w-full p-2 border rounded-md"
              />
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
                <button
                  onClick={() => setShowReset(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
