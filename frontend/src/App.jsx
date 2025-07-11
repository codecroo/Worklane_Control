import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandinPage from "./pages/LandinPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import useAuthCheck from "../src/hooks/useAuthCheck"

function App() {
  const { loading, isAuthenticated } = useAuthCheck();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LandinPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add more routes like /dashboard or /settings here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
