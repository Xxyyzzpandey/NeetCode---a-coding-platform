import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import {  contestsQues } from "../contest/contest";

export default function ContestListPage() {
  const navigate = useNavigate();

  // You will fetch this from backend later:
  const contests =contestsQues;
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0d1117] text-white p-6">
        <h1 className="text-3xl font-bold mb-6">All Contests</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className="bg-gray-800 p-5 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition"
              onClick={() => navigate(`/contest/${contest.id}`)}
            >
              <h2 className="text-xl font-semibold mb-2">{contest.name}</h2>

              <p className="text-gray-400">
                Start:{" "}
                {new Date(contest.startTime).toLocaleString()}
              </p>

              <p className="text-gray-400">
                End:{" "}
                {new Date(contest.endTime).toLocaleString()}
              </p>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
