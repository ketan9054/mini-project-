import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard"; // Dashboard component for logged-in users
import Watchlist from "./components/Watchlist";
import PriceChart from "./components/PriceChart";
import Alerts from "./components/Alerts"; // Import the new Alerts component
import "./App.css";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/price-chart" element={<PriceChart />} />
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </Router>
  );
};

export default App;
