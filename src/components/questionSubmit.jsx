import React, { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SubmitQuestionPage() {

  const backendurl=import.meta.env.VITE_API_BACKENDURL;

  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [description, setDescription] = useState("");
  const [sampleInput, setSampleInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description || !sampleInput || !expectedOutput) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${backendurl}/questions`,
        {
          title,
          difficulty,
          description,
          sampleInput,
          expectedOutput,
        },
        { withCredentials: true } // include cookies if using auth
      );

      setSuccess("Question submitted successfully!");
      // Optionally redirect
      // navigate("/problems");
      setTitle("");
      setDifficulty("Easy");
      setDescription("");
      setSampleInput("");
      setExpectedOutput("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit question");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto mt-12 p-6 bg-[#161b22] border border-gray-700 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">
          Submit a New Question
        </h2>

        {error && <div className="mb-4 text-red-400 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-400 text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Problem title"
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Problem description"
              rows={5}
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Sample Input</label>
            <textarea
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
              placeholder="Sample input"
              rows={3}
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Expected Output</label>
            <textarea
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              placeholder="Expected output"
              rows={3}
              className="w-full p-2 rounded-md bg-[#0d1117] border border-gray-600 text-gray-200 focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold mt-2"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitQuestionPage;
