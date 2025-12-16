import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

function SignIn() {

  const backendurl=import.meta.env.VITE_API_BACKENDURL;
  
 const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 const {setUser}=useAuthStore();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendurl}/auth/signin`,
        { email, password },
        { withCredentials: true } // Important to send/receive cookies
      );
      setUser(res.data);
      localStorage.setItem("token", res.data.token); 
      alert("user signin")
      // If login successful, redirect to problems/home page
      navigate("/problems");
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-white px-4">
        <div className="w-full max-w-md bg-[#161b22] p-8 rounded-lg border border-gray-700 shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

          {error && (
            <div className="mb-4 text-red-400 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white font-semibold mt-2 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-4 text-gray-400 text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-500 underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default SignIn;
