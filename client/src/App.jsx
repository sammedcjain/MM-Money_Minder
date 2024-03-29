import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/NotFound";
import Landing from "./pages/Landing";
import Logout_logic from "./components/Logout_logic";
import Register from "./pages/Register";
import Insights from "./pages/Insights";

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path={`/:user/dashboard`} element={<Dashboard />} />
            <Route path={`/:user/insights`} element={<Insights />} />
            <Route path="/logout" element={<Logout_logic />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
