import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Stock Watchlist App</h1>
      <div className="button-container">
        <button className="small" onClick={() => navigate("/login")}>
          Sign In
        </button>
        <button className="small" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
