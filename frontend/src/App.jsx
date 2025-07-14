import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandinPage from "./pages/LandinPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Marketing from "./pages/Marketing";
import Home from "./pages/Home";
import useAuthCheck from "./hooks/useAuthCheck";

const AppRoutes = () => {
  const { loading, isAuthenticated } = useAuthCheck();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-500">
        Authenticating...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <LandinPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/team" element={<Team />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/marketing" element={<Marketing />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
