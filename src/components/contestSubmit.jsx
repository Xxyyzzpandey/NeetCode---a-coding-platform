import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";

function SubmitContestPage() {

  const backendurl=import.meta.env.VITE_API_BACKENDURL

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [problemIds, setProblemIds] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !description || !startTime || !endTime || !problemIds) {
      setError("All fields are required");
      return;
    }

    // Convert problemIds input string to array
    const problemsArray = problemIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    try {
      await axios.post(
        `${backendurl}/contests`,
        {
          name,
          description,
          startTime,
          endTime,
          problemIds: problemsArray,
        },
        { withCredentials: true }
      );

      setSuccess("Contest submitted successfully!");
      setName("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setProblemIds("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit contest");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-12 p-6 bg-[#161b22] border border-gray-700 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Submit a New Contest
        </h2>

        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-400 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Contest Name */}
          <div>
            <label className="block text-gray-300 mb-1">Contest Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contest Name"
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contest description"
              rows={4}
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="block text-gray-300 mb-1">Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-gray-300 mb-1">End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Problem IDs */}
          <div>
            <label className="block text-gray-300 mb-1">Problem IDs</label>
            <input
              type="text"
              value={problemIds}
              onChange={(e) => setProblemIds(e.target.value)}
              placeholder="Comma separated problem IDs (e.g. 1,2,3)"
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold mt-2"
          >
            Submit Contest
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitContestPage;
