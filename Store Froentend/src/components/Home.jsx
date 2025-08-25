import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-blue-600 text-white py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to ReviewStore⭐
          </h1>
          <p className="text-lg sm:text-xl mb-8 drop-shadow-md">
            All-in-one platform for Users, Store Owners, and Administrators.
          </p>
          {!user && (
            <NavLink to="/login">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                Get Started
              </button>
            </NavLink>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-600 to-transparent"></div>
      </section>
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">
            <div className="mb-4 text-blue-600 text-4xl">👤</div>
            <h3 className="text-xl font-semibold mb-2">Users</h3>
            <p className="text-gray-600 mb-4">
              Browse stores, submit ratings, and manage your profile.
            </p>
            <NavLink
              to={user?.role === "user" ? "/stores" : "/login"}
              className="text-blue-600 font-medium hover:underline"
            >
              Explore
            </NavLink>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">
            <div className="mb-4 text-green-600 text-4xl">🏪</div>
            <h3 className="text-xl font-semibold mb-2">Store Owners</h3>
            <p className="text-gray-600 mb-4">
              Manage products, view ratings, and track orders.
            </p>
            <NavLink
              to={user?.role === "store" ? "/store-dashboard" : "/login"}
              className="text-green-600 font-medium hover:underline"
            >
              Dashboard
            </NavLink>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-2">
            <div className="mb-4 text-yellow-500 text-4xl">🛠️</div>
            <h3 className="text-xl font-semibold mb-2">Admins</h3>
            <p className="text-gray-600 mb-4">
              Manage users & stores, monitor ratings, and control the platform.
            </p>
            <NavLink
              to={user?.role === "admin" ? "/admin-dashboard" : "/login"}
              className="text-yellow-500 font-medium hover:underline"
            >
              Admin Panel
            </NavLink>
          </div>
        </div>
      </section>
      {!user && (
        <section className="bg-blue-600 py-16 px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="mb-6">
            Sign up now and explore features tailored for your role.
          </p>
          <NavLink to="/login">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
              Get Started
            </button>
          </NavLink>
        </section>
      )}
    </div>
  );
};

export default HomePage;
