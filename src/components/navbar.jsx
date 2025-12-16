import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef();

  // Mock auth state, replace with real auth context or API
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;
  const [user, setUser] = useState({ name: "User", avatar: "" });

  // Fetch user info if authenticated
  const av="https://i.pravatar.cc/40"
  useEffect(() => {
    if (isAuthenticated) {
      // Replace with real API call
      setUser({
        name: "Ankit Pandey",
        avatar: av, // mock avatar
      });
    }
  }, [isAuthenticated]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="bg-[#161b22] border-b border-gray-700 shadow">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400 cursor-pointer">
          <Link to="/">NeetCode</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/problems" className="hover:text-blue-400">Problems</Link>
          <Link to="/contest" className="hover:text-blue-400">contest</Link>

          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-full hover:bg-gray-600 transition"
              >
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#161b22] border border-gray-700 rounded-md shadow-lg flex flex-col">
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-left hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-300 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-4">
          <Link to="/" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/problems" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Problems</Link>
          <Link to="/contest" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>contest</Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
