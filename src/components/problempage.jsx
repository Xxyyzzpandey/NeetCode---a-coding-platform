import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import { problems } from "../problems/problem";
import { useStatsStore } from "../store/getStats";
import { useAuthStore } from "../store/authStore";

function ProblemsPage() {
  const { user,setUser } = useAuthStore();
  const { stats, getStats,loading } = useStatsStore();
  
  useEffect(() => {
    if (user) getStats(user.user.id);
  }, []);
  console.log(stats)

  const getProblemStatus = (problemId) => {
    if (!stats || !stats.allProblems) return null;

    const attempt = stats.allProblems.find(
      (p) => p.problemId === problemId
    );

    if (!attempt) return "Not Attempted";
    if (attempt.status === "Accepted") return "solved";
    return "Tried";
  };

  const difficultyColors = {
    Easy: "text-green-400 border-green-400",
    Medium: "text-yellow-400 border-yellow-400",
    Hard: "text-red-400 border-red-400",
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />

      <div className="px-6 md:px-20 py-10">
        <h2 className="text-3xl font-bold mb-6">All Problems</h2>

        <div className="overflow-x-auto border border-gray-700 rounded-lg">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="bg-[#161b22] border-b border-gray-700 text-gray-300">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Difficulty</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {problems.map((problem, idx) => (
                <tr
                  key={problem.id}
                  className="border-b border-gray-700 hover:bg-[#1a2330] transition"
                >
                  <td className="py-3 px-4">{idx + 1}</td>

                  <td className="py-3 px-4 font-medium">{problem.title}</td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-sm rounded border ${
                        difficultyColors[problem.difficulty]
                      }`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {(() => {
                      const status = getProblemStatus(problem.id);

                      switch (status) {
                        case "solved":
                          return (
                            <span className="text-green-400">
                              solved
                            </span>
                          );
                        case "Tried":
                          return (
                            <span className="text-yellow-400">
                              Tried
                            </span>
                          );
                        default:
                          return (
                            <span className="text-gray-400">
                              Not Attempted
                            </span>
                          );
                      }
                    })()}
                  </td>

                  <td className="py-3 px-4">
                    <Link
                      to={`/problems/${problem.id}`}
                      className="text-blue-400 hover:text-blue-500"
                    >
                      Solve →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
