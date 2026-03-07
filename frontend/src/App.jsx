import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Complaint from "./pages/Complaint";
import Admin from "./pages/Admin";
import MapView from "./pages/MapView";
import Infrastructure from "./pages/Infrastructure";

/* NEW PAGES */
import Home from "./pages/Home";
import WaterTank from "./pages/WaterTank";
import StreetLights from "./pages/StreetLights";

import Layout from "./components/Layout";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <Router>

      <Routes>

        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* PROTECTED ROUTES */}
        {isLoggedIn ? (
          <Route path="/" element={<Layout setIsLoggedIn={setIsLoggedIn} />}>

            {/* DEFAULT PAGE AFTER LOGIN */}
            <Route index element={<Home />} />

            <Route path="home" element={<Home />} />

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="complaint" element={<Complaint />} />

            <Route path="admin" element={<Admin />} />

            <Route path="map" element={<MapView />} />

            <Route path="infrastructure" element={<Infrastructure />} />

          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

      </Routes>

    </Router>

  );
}

export default App;