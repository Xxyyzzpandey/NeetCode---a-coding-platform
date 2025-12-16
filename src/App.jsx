import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/home";
import ProblemsPage from "./components/problempage";
import SolveProblemPage from "./components/solveProblem";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import PrivateRoute from "./components/privateroute";
import SubmitQuestionPage from "./components/questionSubmit";
import ProfilePage from "./components/profile";
import ContestPageWithTimer from "./components/contestpage";
import ContestListPage from "./components/contestListpage";
import SubmitContestPage from "./components/contestSubmit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contest" element={<ContestListPage/>}/>

        {/* Protected Routes */}
        <Route
          path="/problems"
          element={
            <PrivateRoute>
              <ProblemsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/problems/:id"
          element={
            <PrivateRoute>
              <SolveProblemPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/submitquestion"
          element={
              <PrivateRoute>
              <SubmitQuestionPage />
              </PrivateRoute>
          }
        />
        <Route
          path="/submitcontest"
          element={
              <PrivateRoute>
              <SubmitContestPage />
              </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
               <PrivateRoute>
              <ProfilePage />
              </PrivateRoute>
          }
        />
        <Route path="/contest/:contestId" element={<ContestPageWithTimer />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
