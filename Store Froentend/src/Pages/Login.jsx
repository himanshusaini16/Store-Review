import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const AuthForm = () => {
  const { backendUrl, setToken, setUser, token } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!isLogin) {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
          address,
          role,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("user", JSON.stringify(data.user));
          setToken(data.token);
          setUser(data.user);
          redirectByRole(data.user.role);
        } else {
          alert(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
          role,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.user.role);
          localStorage.setItem("user", JSON.stringify(data.user));
          setToken(data.token);
          setUser(data.user);
          //console.log("Login data ",data)
          redirectByRole(data.user.role);
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      //console.error(error);
      alert("Something went wrong, please try again.");
    }
  };

  const redirectByRole = (role) => {
    if (role === "admin") navigate("/admin-dashboard");
    else if (role === "store") navigate("/store-dashboard");
    else navigate("/");
  };

  return (
    !token && (
      <form
        onSubmit={onSubmitHandler}
        className="min-h-[80vh] flex items-center"
      >
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
          <p className="text-2xl font-semibold">
            {isLogin ? "Login" : "Create Account"}
          </p>

          {!isLogin && (
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
          )}

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

          {!isLogin && (
            <div className="w-full">
              <p>Address</p>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
              />
            </div>
          )}

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
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p className="text-center w-full mt-2 text-sm">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </form>
    )
  );
};

export default AuthForm;
