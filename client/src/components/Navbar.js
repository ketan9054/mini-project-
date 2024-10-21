import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Optional: Add a CSS file for styling

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear the token from local storage
    navigate("/"); // Redirect to the home page
  };

  return (
    <nav className="navbar">
      <h2>Stock Watchlist</h2>
      <ul>
        <li>
          <Link to="/alerts">Alerts</Link> {/* New link for Alerts feature */}
        </li>
        <li>
          <Link to="/price-chart">Price Chart</Link>{" "}
          {/* Update the link to /watchlist */}
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
