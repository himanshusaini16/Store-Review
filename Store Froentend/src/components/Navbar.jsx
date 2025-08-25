import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const { user, logout, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState(
    user?.image ||
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJAAnAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABgcBBAgFAgP/xAA9EAABAwICBwQIAwcFAAAAAAABAAIDBAUGEQcSITFBUYETYXGRFCIjMmKCobGSwcIzQlNy0dLwFSRDRHP/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/ALxREQEREBERAREQERYQZRYzWUBERAREQEREBERAREQEREBERBgqB440m2zDT30VI30+5tG2FjsmRH43cD3DatPS5jp9gp22i1SatzqWaz5WnbTx8/5jty5ZE8lQRJJJc4uJJJJOZJ5nvRcxKb5pDxTeXu7a6SU0J3Q0fsmt6j1j1Ki05NRIZKgumed75XF7vMoiK3rZerranB1tuVZTZbhHMQ0fLu+isPC2mO5Ub2QYjiFdT7jURNDJWjmQPVd0y6qrkQjrezXagvVBFXWypZPTyD1XNO48QRwI4grfXLeCMXVuEbqKmDWlpJCPSqXPZIOY4Bw4Houm7dW09xoaeso5Gy087A+N7dzmncjLZREQEREBERAREQEREBfhXVMVHSTVU7g2KCN0j3HgGjM/ZfuolpWqXUuALu5pIL4hFmDl7zg380HOd7uk17u9ZdKnPtauUyEH90bmjoAB0WkiI1giIgIiICunQHfXS0lbYJnZ+jH0in/kcfWHR235lSym2hqpNNj+iaCQJ4pYiOfq636UTXSCIiIIiICIiAiIgIiICiGlmndU6P7s1u+ONsv4XA/kpeta40kVfQVFHUDOGoidE8dzhkUHIKytm6W6otFyqrbWD29LKYn9+W49Rkeq1kawREQEREBTTQ7TmfSDQEf8Mcsp8NXL9ShauTQDYntZX36ZuTZP9tT94BzefPIdCiauJEREEREBERAREQEREBYIzWVgkDegqzTJgaS6Ri/2iEvrIGatVCxubpoxucBxc36jwCowHPcc11ldsRWe0VNNTXK409NPUu1YWSOyLj+Q4ZnZnsUJxzoqor7JJcLJJHQ179r49X2Mx5kD3SeY8kVQiL2r5hO/2FxF0tVRGwHLtWN7SM9+s3h45Lwe2i/iM/EEV+iL7pIZa2YQ0UUlTKdzIGF7vIKwMLaJb5dZGy3lv+l0meZ1snTOHc3c3xPkgi2EcM12K7uygoQWNHrT1Bbm2BnM9/IcfNdQWi20totlNb6CMR01OwMY3u/zavEpxhjR9aYad01PbqaR4AfKfXmedms47yeZ3DuUkjkZLG2SJ7XscM2uacwR4oy+0REBERAREQEREBERAVd6TNI0eG2uttqLJbs9ubnHaynB4u5u4gdT3+vpIxa3CdidNEWmvqCY6RjhmNbLa4jk3f5DiuaZ5paieSeolfLNK4vfI85ueScySUV9VtTPXVU1VWyvnqJjnLLIc3PPeVKsJaRr7hpjKZkja2gYMhTVBPqD4Hbx4bQogiLF/WbTHhytaG18dXbpDv7SPXYfBzc/qAvXdjLAVUe0lutoc4/xtUO+ozXNSIkdJT6ScF2+LKC5wyAfuUkRf9hkoViDTW+WN0eHLc6InYKityJHeGA/c9FUSIRtXS5V13rX1tzqpKmpeMjLIduXIcAO4KS4Bx7XYRnZTu1qm0Od7Slz2x5na6M8Dv2bjt4qIIhHXVpuVJd7fDXW+Zs1PM3WY9v2PI8xwW4uc9FWM34avLaKslItVa8NfnuhkOwPHIcD0PBdFjciMoiICIiAiIgLBWV4mNLmbNhW6XBrtWSGnf2Z+IjIfUhBz9pNxA7EWLquVsmtSUrjT0wG4Nb7x6uz6ZclFVho1WhuZIHNZRcEREUREQEREBERBggHYQCORXR2iHET77hKKOpl7SsoHejzEna4D3HH5cuoK5yVj6Cbl6Li2ooS4hlbSnZwLmHMfRzkZX+iIgIiICIiAoDpvmMWAahjT+2qYGHw1w79KnyielGxzX/BlbSUjS6pj1Z4mje9zDnq9RmEHMqLAIIzCyjVEREBERAREQEREBSXRrOafH9ic05B1QWH5mOH5qNKbaH7JLdsaUtU0H0e2nt5XjcDkQxviTt8Aia6QRERBERAREQFghZRBWmPdFdLfJpblZJGUdwedaWN37KY8zl7p7x1Cpi+YcvVgmdHd7dUQAHZKW60TvB42dN/cusl8PijkYWSMa9p3hwzBQcdggjMEHqsrpu6aOsJ3IvdLZaeKR+0vph2JJ5+rkFGa3QnY5STRXO403wkskA825/VFqikVwT6DpP+vfwf/Sl/o5ah0H3PPZfaPrTO/uRaqpFbMeg+uz9rfqfL4aZx/Ut+n0HUuw1V+qXDiIYGt++aFUv5LMTHzSiKBj5ZXbo42lzj4AbV0NbtEOFKQtdPFV1jgNpqJzkejcgpbabBaLNHqWq20lIOPYwtaT4neUSqJwpopvl6dHNc2utVHxMrfbPHczh83krzw7Ybfh22R2+1Q9lCzaSTm57uLnHiV6mSyiCIiAiIg//Z"
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

    switch (user[0].role) {
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
    <div className="bg-blue-600 flex justify-between items-center text-white p-4 shadow-lg">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <NavLink to="/">ReviewStore⭐</NavLink>
      </div>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-6 items-center font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className="hover:text-gray-200 transition-colors duration-200"
          >
            {link.name}
          </NavLink>
        ))}
      </ul>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="p-2 rounded-l text-black w-36 sm:w-48"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-blue-600 px-3 rounded-r hover:bg-gray-200"
          >
            🔍
          </button>
        </div>

        {/* Profile / Auth */}
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
    </div>
  );
};

export default Navbar;
