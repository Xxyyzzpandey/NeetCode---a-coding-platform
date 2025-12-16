import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
import axios from "axios";
import { problems } from "../problems/problem";
import { useAuthStore } from "../store/authStore";

function SolveProblemPage() {
 
  const backendurl=import.meta.env.VITE_API_BACKENDURL;
  console.log(backendurl);

  const { id } = useParams();
  const problemId = parseInt(id, 10);
  const problem = problems.find((p) => p.id === problemId);

  const [language, setLanguage] = useState("java");
  const [userLogic, setUserLogic] = useState(
    problem.languages[language].starterCode
  );
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [output, setOutput] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const {user,setUser} =useAuthStore();
  
  
  const languageMap = {
    javascript: "javascript",
    python: "python",
    cpp: "cpp",
    java: "java",
  };

  const normalize = (val) => {
if (val === undefined || val === null) return "";
return val
.toString()
.trim()
.replace(/.0$/, "") // remove trailing 5.0 → 5
.replace(/\r/g, ""); // remove Windows carriage returns
};

  // Helper to safely render any value (string, number, object)
  const renderValue = (val) => {
    if (val === undefined || val === null) return "";
    if (typeof val === "object") return JSON.stringify(val, null, 2);
    return val.toString();
  };

  // -----------------------
  // RUN CODE
  // -----------------------
  const runCode = async () => {
  setRunLoading(true);
  setOutput(null);
  setTestResults([]);

  try {
    const finalCode = problem.languages[language].build(userLogic);
    const stdin = Object.values(problem.sampleInput).join("\n") + "\n";

    const res = await axios.post(`${backendurl}/code/run`, {
      code: finalCode,
      language: languageMap[language],
      input:stdin,
    });

    if(res.status.id===5){
      setOutput({
      status: "Time Limit Exceeded",
      stdout: out || "No Output",
      stderr: res.data.stderr,
      compile_output: res.data.compile_output,
      time: res.data.time,
      memory: res.data.memory,
    });
    }
    const out = (res.data.stdout ?? res.data.output ?? "").toString().trim();
    const passed = normalize(out) === normalize(problem.expectedOutput);

    setOutput({
      status: { description: passed ? "Accepted" : "Wrong Answer" },
      stdout: out || "No Output",
      stderr: res.data.stderr,
      compile_output: res.data.compile_output,
      time: res.data.time,
      memory: res.data.memory,
    });

    setTestResults([
      {
        input: problem.sampleInput,
        expected: problem.expectedOutput,
        stdout: out || "No Output",
        passed,
        statusDescription: passed ? "Accepted" : "Wrong Answer",
      },
    ]);
  } catch (err) {
    setOutput({
      stderr: err.response?.data?.error || err.message,
      status: { description: "Error" },
    });
  }

  setRunLoading(false);
};


  // -----------------------
  // SUBMIT CODE
  // -----------------------
  const submitCode = async () => {
  if (!problem.testCases || problem.testCases.length === 0) {
    alert("No test cases defined for this problem.");
    return;
  }

  setSubmitLoading(true);
  setOutput(null);
  setTestResults([]);

  try {
    const finalCode = problem.languages[language].build(userLogic);
    const results = [];

    for (const tc of problem.testCases) {
      const stdin = Object.values(tc.input).join("\n") + "\n";

      const res = await axios.post(`${backendurl}/code/run`, {
        code: finalCode,
        language: languageMap[language],
        input: stdin,
      });

      const out = (res.data.stdout ?? res.data.output ?? "").toString().trim();

      const passed = normalize(out) === normalize(tc.expectedOutput);

      results.push({
        input: tc.input,
        expected: tc.expectedOutput,
        stdout: out || "No Output",
        passed,
        statusDescription: passed ? "Accepted" : "Wrong Answer",
      });

      // Stop on TLE
      if (res.data.status?.id === 5) {
        results[results.length - 1].statusDescription = "Time Limit Exceeded";
        break;
      }
    }

    setTestResults(results);

    const allPassed = results.every((r) => r.passed);

    const finalStatus = allPassed ? "Accepted" : "Wrong Answer";

    setOutput({
      status: { description: finalStatus },
    });

    // --------------------------
    // Send result to backend
    // --------------------------
    await axios.post(`${backendurl}/code/markSolved`, {
      userId: user.user.id,      // get current logged-in user id
      problemId: problem.id,
      status: finalStatus,
      language,
    });

  } catch (err) {
    setOutput({
      stderr: err.response?.data?.error || err.message,
      status: { description: "Error" },
    });
  }

  setSubmitLoading(false);
};

  // Update starter code when language changes
  useEffect(() => {
    setUserLogic(problem.languages[language].starterCode);
  }, [language, problem]);

  // -----------------------
  // Render
  // -----------------------
  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar />

      <div className="px-6 md:px-20 py-10">
        <h2 className="text-3xl font-bold mb-2">{problem.title}</h2>
        <span className="px-3 py-1 rounded-full text-sm bg-green-600">
          {problem.difficulty}
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Problem Description */}
          <div className="bg-[#161b22] p-6 rounded-lg border border-gray-700 shadow-md max-h-[70vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Problem Description</h3>
            <pre className="whitespace-pre-wrap text-gray-300">
              {renderValue(problem.description)}
            </pre>

            <h4 className="text-lg font-semibold mt-4">Sample Input:</h4>
            <pre className="text-gray-400">
              {renderValue(problem.sampleInput)}
            </pre>

            <h4 className="text-lg font-semibold mt-2">Expected Output:</h4>
            <pre className="text-gray-400">
              {renderValue(problem.expectedOutput)}
            </pre>
          </div>

          {/* Editor + Output */}
          <div className="flex flex-col gap-4">
            {/* Language & Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <label className="text-gray-300">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#161b22] border border-gray-700 rounded-md px-2 py-1 text-gray-200"
              >
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="javascript">JavaScript</option>
              </select>

              <button
                onClick={runCode}
                disabled={runLoading}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md hover:from-blue-600 hover:to-blue-800 transition-all disabled:opacity-50"
              >
                {runLoading ? "Running..." : "Run"}
              </button>

              <button
                onClick={submitCode}
                disabled={submitLoading}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 rounded-md hover:from-green-600 hover:to-green-800 transition-all disabled:opacity-50"
              >
                {submitLoading ? "Submitting..." : "Submit"}
              </button>
            </div>

            {/* Code Editor */}
            <div className="bg-[#161b22] border border-gray-700 rounded-lg p-2 shadow-inner">
              <textarea
                className="w-full h-[50vh] p-4 bg-[#0d1117] border-none rounded-lg font-mono text-gray-200 resize-none focus:outline-none"
                value={userLogic}
                onChange={(e) => setUserLogic(e.target.value)}
              />
            </div>

            {/* Output & Test Results */}
            
{/* Output & Test Results Box - Always Visible */}
<div className="bg-[#161b22] rounded-lg border border-gray-700 p-4 shadow-md max-h-[350px] overflow-auto mt-4">
  <h4 className="text-lg font-semibold mb-3">Output & Test Results</h4>

  {/* Overall Status */}
  <p
    className={`font-semibold mb-2 ${
      testResults.length > 0 && testResults.every((t) => t.passed)
        ? "text-green-400"
        : "text-red-400"
    }`}
  >
    Status:{" "}
    {testResults.length > 0
      ? testResults.every((t) => t.passed)
        ? "Accepted"
        : output?.status?.description || "Error"
      : "No Output Yet"}
  </p>

  {/* Stdout / Errors */}
  {(output?.stdout || output?.compile_output || output?.stderr) && (
    <>
      {output.stdout && (
        <div className="mt-2">
          <p className="font-semibold">Output:</p>
          <pre className="whitespace-pre-wrap text-gray-200">{output.stdout}</pre>
        </div>
      )}

      {output.compile_output && (
        <div className="mt-2">
          <p className="font-semibold text-red-400">Compilation Error:</p>
          <pre className="whitespace-pre-wrap text-red-300">{output.compile_output}</pre>
        </div>
      )}

      {output.stderr && (
        <div className="mt-2">
          <p className="font-semibold text-red-400">Runtime Error:</p>
          <pre className="whitespace-pre-wrap text-red-300">{output.stderr}</pre>
        </div>
      )}
    </>
  )}

  {/* Time & Memory */}
  {(output?.time || output?.memory) && (
    <div className="mt-2 text-sm text-gray-400">
      {output.time && <p>Time: {output.time}s</p>}
      {output.memory && <p>Memory: {output.memory} KB</p>}
    </div>
  )}

  {/* Test Results */}
  {testResults.length > 0 ? (
    <div className="mt-4">
      {testResults.map((t, i) => (
        <div
          key={i}
          className="mb-3 p-3 border-b border-gray-700 rounded-md bg-[#0f131a]"
        >
          {/* Badge */}
          <div className="flex items-center justify-between mb-1">
            <span
              className={`px-2 py-1 rounded-full text-sm font-semibold ${
                t.passed
                  ? "bg-green-600"
                  : t.statusDescription === "Time Limit Exceeded"
                  ? "bg-yellow-500"
                  : "bg-red-600"
              }`}
            >
              {t.passed ? "Accepted" : t.statusDescription}
            </span>
            <span className="text-gray-400 text-sm">Test {i + 1}</span>
          </div>

          {/* Input */}
          <p className="text-gray-300 text-sm">Input: {JSON.stringify(t.input)}</p>

          {/* Output */}
          <p className="text-gray-300 text-sm">Output: {t.stdout}</p>

          {/* Expected */}
          <p className="text-gray-300 text-sm">Expected: {t.expected}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-400 text-sm mt-2">No test results yet</p>
  )}
</div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SolveProblemPage;
