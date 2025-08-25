import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profileImage] = useState(
    user?.image || "https://via.placeholder.com/40"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/stores?q=${encodeURIComponent(searchQuery)}`);
        setShowMobileMenu(false);
      }
    }
  };

  const getLinks = () => {
    if (!user) {
      return [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
      ];
    }

    switch (user[0]?.role) {
      case "user":
        return [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
          { name: "Stores", path: "/stores" },
        ];
      case "store":
        return [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
          { name: "Dashboard", path: "/store-dashboard" },
          { name: "Ratings", path: "/store-ratings" },
        ];
      case "admin":
        return [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Contact", path: "/contact" },
          { name: "Admin Dashboard", path: "/admin-dashboard" },
          { name: "Users", path: "/admin-users" },
          { name: "Stores", path: "/admin-stores" },
        ];
      default:
        return [];
    }
  };

  const navLinks = getLinks();

  return (
    <div className="bg-blue-600 text-white shadow-lg">
      <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/">ReviewStore⭐</NavLink>
        </div>

        {/* Search Bar (always visible) */}
        <div className="flex flex-1 max-w-xs sm:max-w-md mx-4">
          <input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="p-2 rounded-l text-black w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-blue-600 px-3 rounded-r hover:bg-gray-200"
          >
            🔍
          </button>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden sm:flex items-center gap-4">
          {token ? (
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                  <div className="p-3 flex flex-col gap-2">
                    <NavLink
                      to="/profile"
                      className="text-sm hover:text-blue-600"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="text-sm hover:text-red-600 text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200">
                Login / Create Account
              </button>
            </NavLink>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="sm:hidden bg-blue-700 text-white flex flex-col gap-4 p-4 z-50">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setShowMobileMenu(false)}
              className="hover:text-gray-200 transition-colors duration-200"
            >
              {link.name}
            </NavLink>
          ))}

          {token ? (
            <>
              <NavLink
                to="/profile"
                className="hover:text-gray-200"
                onClick={() => setShowMobileMenu(false)}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="hover:text-red-400 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" onClick={() => setShowMobileMenu(false)}>
              <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 w-full">
                Login / Create Account
              </button>
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
