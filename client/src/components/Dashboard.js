import React from "react";
import Navbar from "./Navbar"; // Adjust the path as necessary
import Watchlist from "./Watchlist"; // Import the Watchlist component

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Your Watchlist</h1>
      <Watchlist /> {/* Add Watchlist here */}
    </div>
  );
};

export default Dashboard;
