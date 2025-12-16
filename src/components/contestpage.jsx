import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import { contestsQues } from "../contest/contest";
import { problems } from "../problems/problem";

export default function ContestPageWithTimer() {

  const backendurl=import.meta.env.VITE_API_BACKENDURL

  const { contestId } = useParams();
  const navigate = useNavigate();

  const [contest, setContest] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [language, setLanguage] = useState("java");

  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState("loading");

  const [output, setOutput] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isContestClosed, setIsContestClosed] = useState(false);


  const languageMap = {
    javascript: "javascript",
    python: "python",
    cpp: "cpp",
    java: "java",
  };

  const normalize = (v) => {
    if (!v) return "";
    return v.toString().trim().replace(/\.0$/, "").replace(/\r/g, "");
  };

  const renderValue = (v) => {
    if (v === undefined || v === null) return "";
    if (typeof v === "object") return JSON.stringify(v, null, 2);
    return v.toString();
  };

  /** ---------------- FETCH CONTEST DATA ---------------- */
   useEffect(() => {
    // Get contest data
    const c = contestsQues.find(c => c.id === contestId);
    if (!c) return;

    // Map problem IDs to actual problems
    const contestProblems = problems.filter(p => c.problemIds.includes(p.id));

    setContest({ ...c, problems: contestProblems });
    setSelectedProblem(contestProblems[0]);
    setUserCode(contestProblems[0]?.languages[language]?.starterCode);
  }, [contestId, language]);

  // Update starter code when language changes
  useEffect(() => {
    if (selectedProblem) {
      setUserCode(selectedProblem.languages[language]?.starterCode);
    }
  }, [language, selectedProblem]);

  /** ---------- TIMER ---------- */
  useEffect(() => {
    if (!contest) return;

    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);
    const now = new Date();

    if (now < start) setStatus("not_started");
    else if (now > end) setStatus("ended");
    else setStatus("running");

    setTimeLeft(Math.floor((end - now) / 1000));
  }, [contest]);

  

  const formatTime = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};


  /** ---------------- RUN CODE ---------------- */
  const runCode = async () => {
    setRunLoading(true);
    setOutput(null);
    setTestResults([]);

    try {
      const buildFn = selectedProblem.languages[language].build;
      const finalCode = buildFn(userCode);
      const stdin = Object.values(selectedProblem.sampleInput).join("\n") + "\n";

      const res = await axios.post(`${backendurl}/code/run`, {
        code: finalCode,
        language: languageMap[language],
        input: stdin
      });

      const out = normalize(res.data.stdout ?? res.data.output ?? "");
      const passed = out === normalize(selectedProblem.expectedOutput);

      setOutput({
        status: passed ? "Accepted" : "Wrong Answer",
        stdout: out,
        stderr: res.data.stderr,
        compile_output: res.data.compile_output,
      });

      setTestResults([
        {
          input: selectedProblem.sampleInput,
          expected: selectedProblem.expectedOutput,
          stdout: out,
          passed
        }
      ]);

    } catch (err) {
      setOutput({
        status: "Error",
        stderr: err.response?.data?.error || err.message
      });
    }

    setRunLoading(false);
  };

  /** ---------------- SUBMIT CODE ---------------- */
  const submitCode = async () => {
    setSubmitLoading(true);
    setOutput(null);
    setTestResults([]);

    try {
      const buildFn = selectedProblem.languages[language].build;
      const finalCode = buildFn(userCode);

      const results = [];

      for (const tc of selectedProblem.testCases) {
        const stdin = Object.values(tc.input).join("\n") + "\n";

        const res = await axios.post(`${backendurl}/code/run`, {
          code: finalCode,
          language: languageMap[language],
          input: stdin
        });

        const out = normalize(res.data.stdout ?? res.data.output ?? "");
        const passed = out === normalize(tc.expectedOutput);

        results.push({
          input: tc.input,
          expected: tc.expectedOutput,
          stdout: out,
          passed
        });
      }

      setTestResults(results);

      const allPassed = results.every((r) => r.passed);

      setOutput({
        status: allPassed ? "Accepted" : "Wrong Answer"
      });

      // BLOCK PAGE REOPEN (store submission)
      localStorage.setItem(`contest_${contestId}_submitted`, "1");

    } catch (err) {
      setOutput({
        status: "Error",
        stderr: err.response?.data?.error || err.message
      });
    }

    setSubmitLoading(false);
  };

  /** ---------------- BLOCK PAGE REOPEN ---------------- */
  useEffect(() => {
  const s = localStorage.getItem(`contest_${contestId}_submitted`);
  if (s === "1") setIsContestClosed(true);
}, [contestId]);

// Also check if contest has ended
useEffect(() => {
  if (!contest) return;

  const interval = setInterval(() => {
    const now = new Date();
    const start = new Date(contest.startTime);
    const end = new Date(contest.endTime);

    if (now < start) {
      setStatus("not_started");
      setIsContestClosed(false); // not closed yet
    } else if (now > end) {
      setStatus("ended");
      setIsContestClosed(true); // contest ended
    } else {
      setStatus("running");
      setIsContestClosed(false); // contest running
    }

    setTimeLeft(Math.max(Math.floor((end - now) / 1000), 0));
  }, 1000);

  return () => clearInterval(interval);
}, [contest]);


  /** ---------- UI ---------- */

  if (!contest) return null;

  if (status === "not_started")
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="bg-gray-900/50 p-10 rounded-2xl shadow-lg backdrop-blur-md text-center border border-gray-700">
          <div className="text-6xl mb-4 text-yellow-400 animate-bounce">⏳</div>
          <h1 className="text-4xl font-bold text-white mb-2">Contest Not Started</h1>
          <p className="text-gray-300 text-lg">
            The contest will begin soon. Stay tuned!
          </p>
        </div>
      </div>
    </>
  );

if (status === "ended")
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center bg-[#0d1117]">
        <div className="bg-gray-900/50 p-10 rounded-2xl shadow-lg backdrop-blur-md text-center border border-gray-700">
          <div className="text-6xl mb-4 text-red-500 animate-pulse">✅</div>
          <h1 className="text-4xl font-bold text-white mb-2">Contest Ended</h1>
          <p className="text-gray-300 text-lg">
            This contest has ended. Thanks for participating!
          </p>
        </div>
      </div>
    </>
  );


  return (
    <>
      <Navbar />

<div className="min-h-screen flex bg-[#0d1117] text-white">
  {/* SIDEBAR */}
  <div className="w-1/4 border-r border-gray-700 p-4">
    <h2 className="text-xl font-bold mb-4">{contest.name}</h2>

    {contest.problems.map((p) => (
      <div
        key={p.id}
        onClick={() => {
          setSelectedProblem(p);
          setUserCode(p.languages[language].starterCode);
        }}
        className={`p-3 mb-2 rounded cursor-pointer ${
          selectedProblem?.id === p.id
            ? "bg-gray-800"
            : "hover:bg-gray-700"
        }`}
      >
        <div className="flex justify-between">
          <span>{p.title}</span>
          <span className="text-yellow-400">{p.difficulty}</span>
        </div>
      </div>
    ))}
  </div>

  {/* MAIN */}
  <div className="w-3/4 p-6">
    {isContestClosed ? (
      <div className="text-center text-2xl font-bold text-red-600 mt-20">
        Contest Closed / Already Submitted
      </div>
    ) : (
      <>
        {/* TIMER */}
        <div className="text-right text-xl mb-4">
          Time Left: <span className="text-yellow-400">{formatTime(timeLeft)}</span>
        </div>

        <h2 className="text-2xl font-bold mb-3">{selectedProblem?.title}</h2>

        <p className="mb-6">{selectedProblem?.description}</p>

        {/* Sample Input */}
        <div className="mb-4 bg-[#161b22] p-4 rounded border border-gray-700">
          <h4 className="font-semibold text-gray-200 mb-1">Sample Input:</h4>
          <pre className="text-gray-300">{JSON.stringify(selectedProblem?.sampleInput, null, 2)}</pre>
        </div>

        {/* Expected Output */}
        <div className="mb-6 bg-[#161b22] p-4 rounded border border-gray-700">
          <h4 className="font-semibold text-gray-200 mb-1">Expected Output:</h4>
          <pre className="text-gray-300">{selectedProblem?.expectedOutput}</pre>
        </div>

        {/* CODE EDITOR */}
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          className="w-full min-h-[250px] bg-gray-900 text-white p-4 border border-gray-700 rounded"
        />

        <div className="flex gap-4 mt-4">
          <button
            onClick={runCode}
            className="bg-blue-600 px-5 py-2 rounded"
          >
            {runLoading ? "Running..." : "Run Code"}
          </button>

          <button
            onClick={submitCode}
            className="bg-green-600 px-5 py-2 rounded"
          >
            {submitLoading ? "Submitting..." : "Submit Problem"}
          </button>
        </div>

        {/* OUTPUT */}
        <div className="mt-6 p-4 bg-gray-800 rounded">
          <h3 className="text-xl mb-2">Output</h3>

          {output && (
            <p
              className={`font-bold ${
                output.status === "Accepted" ? "text-green-400" : "text-red-400"
              }`}
            >
              {output.status}
            </p>
          )}

          {output?.stdout && (
            <pre className="text-gray-300 mt-2">Output: {output.stdout}</pre>
          )}

          {output?.stderr && (
            <pre className="text-red-400 mt-2">Error: {output.stderr}</pre>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="mt-4">
              {testResults.map((t, i) => (
                <div key={i} className="p-2 border-b border-gray-600">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      t.passed ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {t.passed ? "Accepted" : "Wrong Answer"}
                  </span>

                  <p className="text-gray-400">Input: {JSON.stringify(t.input)}</p>
                  <p className="text-gray-400">Output: {t.stdout}</p>
                  <p className="text-gray-400">Expected: {t.expected}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    )}
  </div>
</div>

    </>
  );
}
