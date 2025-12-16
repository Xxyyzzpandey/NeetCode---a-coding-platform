import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { useAuthStore } from "../store/authStore"; 
import { problems } from "../problems/problem"; // array of problem titles, e.g., ["Two Sum", "Reverse String"]
import { useStatsStore } from "../store/getStats";


function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const {stats,setStats}=useStatsStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    // If user data not in store, you might fetch it from backend
    if (!user) {
      // Example mock user if no backend fetch
      setUser({
        id: 1,
        name: "Ankit",
        email: "ankit@example.com",
        avatar: "https://i.pravatar.cc/100?img=12",
        createdAt: "2025-01-15",
        stats: { totalSolved: 34, totalProblems: 50, successRate: 68 },
        solvedProblems: [
          { problemId: 0, status: "Accepted", language: "JavaScript", solvedAt: new Date() },
          { problemId: 1, status: "Wrong Answer", language: "Python", solvedAt: new Date() },
        ],
      });
    }

    setLoading(false);
  }, [navigate, setUser, user]);

  if (!user || loading) return null;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />

      <div className="px-6 md:px-20 py-10 space-y-8">
        {/* Profile Card */}
        <div className="max-w-3xl mx-auto bg-[#161b22] border border-gray-700 rounded-xl p-8 shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full mb-4 border-4 border-blue-400 hover:scale-105 transition-transform"
            />
            <h2 className="text-2xl font-bold mb-1">{user.user.name}</h2>
            <p className="text-gray-400 mb-2">{user.user.email}</p>
<p className="text-gray-500 text-sm">
  Joined: {new Date(user.user.createdAt).toLocaleDateString()} 
</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => alert("Change password coming soon!")}
                className="flex-1 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 text-white font-semibold"
              >
                Change Password
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/signin");
                }}
                className="flex-1 px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-4 text-center hover:scale-105 transition-transform">
            <p className="text-gray-400">Solved Problems</p>
            <p className="text-2xl font-bold text-green-400">{stats.totalSolved}</p>
          </div>
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-4 text-center hover:scale-105 transition-transform">
            <p className="text-gray-400">Total Attempted</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.totalProblems}</p>
          </div>
          <div className="bg-[#161b22] border border-gray-700 rounded-lg p-4 text-center hover:scale-105 transition-transform">
            <p className="text-gray-400">Success Rate</p>
            <p className="text-2xl font-bold text-blue-400">{(stats.totalSolved/stats.totalProblems)*100}%</p>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="max-w-3xl mx-auto bg-[#161b22] border border-gray-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Submissions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray-200">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2">Problem</th>
                  <th className="px-4 py-2">Language</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Time</th>
                </tr>
              </thead>
              <tbody>
                {stats.allProblems.map((sub, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-800 transition">
                    <td className="px-4 py-2">{problems[sub.problemId-1]?.title}</td>
                    <td className="px-4 py-2">{sub.language}</td>
                    <td className={`px-4 py-2 font-semibold ${sub.status === "Accepted" ? "text-green-400" : "text-red-400"}`}>
                      {sub.status}
                    </td>
                    <td className="px-4 py-2 text-gray-400">{new Date(sub.solvedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
