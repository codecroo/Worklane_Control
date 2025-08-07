// App.jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandinPage from "./pages/LandinPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Employees from "./pages/Employees";
import Projects from "./pages/Projects";
import Marketing from "./pages/Marketing";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import useAuthCheck from "./hooks/useAuthCheck";

const AppRoutes = () => {
  const { loading, isAuthenticated } = useAuthCheck();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-500">
        Authenticating..
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandinPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Pages with Navbar */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/employees" element={isAuthenticated ? <Employees /> : <Navigate to="/" />} />
        <Route path="/projects" element={isAuthenticated ? <Projects /> : <Navigate to="/" />} />
        <Route path="/marketing" element={isAuthenticated ? <Marketing /> : <Navigate to="/" />} />
      </Route>
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