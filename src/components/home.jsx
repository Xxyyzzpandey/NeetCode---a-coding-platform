import React from "react";
import Navbar from "./navbar";
import { contestsQues } from "../contest/contest";

const upcomingContests = contestsQues;

function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center px-6 md:px-20 mt-16">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
          Practice DSA and Become a Better Programmer
        </h2>
        <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Solve coding challenges, run code instantly with NeedCode, and improve every day.
        </p>
        <a
          href="/problems"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Start Solving →
        </a>
      </section>

      {/* Why Practice DSA Section */}
      <section className="mt-20 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-bold text-gray-100 mb-6">Why Practice DSA?</h3>
        <p className="text-gray-400 mb-12 max-w-3xl mx-auto">
          Data Structures and Algorithms are the backbone of problem solving in programming.
          Practicing DSA helps you write optimized code, improve problem-solving skills, and
          ace technical interviews at top companies.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#161b22] border border-gray-700 shadow rounded-lg p-6 hover:border-blue-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-blue-400">Master Algorithms</h4>
            <p className="text-gray-400">Learn common algorithms and problem-solving patterns.</p>
          </div>
          <div className="bg-[#161b22] border border-gray-700 shadow rounded-lg p-6 hover:border-blue-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-blue-400">Improve Efficiency</h4>
            <p className="text-gray-400">Optimize your code and write faster, scalable solutions.</p>
          </div>
          <div className="bg-[#161b22] border border-gray-700 shadow rounded-lg p-6 hover:border-blue-500 transition">
            <h4 className="text-xl font-semibold mb-2 text-blue-400">Ace Interviews</h4>
            <p className="text-gray-400">Prepare for coding interviews at top tech companies.</p>
          </div>
        </div>
      </section>

      {/* Upcoming Contests Section */}
      <section className="mt-20 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-bold text-gray-100 mb-8">Upcoming Contests</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingContests.map((contest) => (
            <div
              key={contest.id}
              className="bg-[#161b22] border border-gray-700 shadow rounded-lg p-6 hover:border-blue-500 transition"
            >
              <h4 className="text-xl font-semibold mb-2 text-blue-400">{contest.name}</h4>
              <p className="text-gray-400 mb-1">
                Start: <span className="font-medium">{contest.startTime}</span>
              </p>
              <p className="text-gray-400 mb-4">
                End: <span className="font-medium">{contest.endTime}</span>
              </p>
              <a
                href={`/contest/${contest.id}`}
                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition"
              >
                Join Contest →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#161b22] border border-gray-700 shadow rounded-lg p-6 text-center hover:border-blue-600 transition">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">
            Real Code Execution
          </h3>
          <p className="text-gray-400">
            NeetCode sandbox runs your code securely in 3+ programming languages.
          </p>
        </div>
        <div className="bg-[#161b22] border border-gray-700 shadow rounded-lg p-6 text-center hover:border-blue-600 transition">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">
            Test Case Evaluation
          </h3>
          <p className="text-gray-400">
            Problems include sample and hidden test cases to verify logic.
          </p>
        </div>
        <div className="bg-[#161b22] border border-gray-700 shadow rounded-lg p-6 text-center hover:border-blue-600 transition">
          <h3 className="text-xl font-semibold mb-2 text-blue-400">
            Track Progress
          </h3>
          <p className="text-gray-400">
            Earn points, climb the leaderboard, and improve daily.
          </p>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="mt-20 px-6 md:px-20 text-center">
        <div className="bg-blue-600 p-10 rounded-lg shadow-lg">
          <h3 className="text-3xl font-bold mb-4">Ready to Level Up Your Skills?</h3>
          <p className="text-gray-100 mb-6">Start solving problems today and see your improvement!</p>
          <a
            href="/problems"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition"
          >
            Start Solving →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-6 bg-[#161b22] border-t border-gray-700 text-center text-gray-400">
        © {new Date().getFullYear()} NeetCode. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
