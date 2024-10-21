// src/Alerts.js
import React, { useState, useEffect } from "react";

const Alerts = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [triggerPrices, setTriggerPrices] = useState({}); // Store trigger prices for stocks
  const [showInput, setShowInput] = useState({}); // Track which inputs to show

  const fetchWatchlist = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/watchlist",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setWatchlist(data.watchlist);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const handleTriggerPriceChange = (ticker, value) => {
    setTriggerPrices((prev) => ({ ...prev, [ticker]: value }));
  };

  const setPriceAlert = async (ticker) => {
    const token = localStorage.getItem("authToken");
    const alertPrice = triggerPrices[ticker];

    try {
      await fetch("http://localhost:5000/api/alerts/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ticker, alertPrice }),
      });
      alert(`Price alert set for ${ticker} at ${alertPrice}`);
      setShowInput((prev) => ({ ...prev, [ticker]: false })); // Hide input after setting alert
    } catch (error) {
      console.error("Error setting price alert:", error);
    }
  };

  const handleShowInput = (ticker) => {
    setShowInput((prev) => ({ ...prev, [ticker]: !prev[ticker] }));
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div>
      <h2>Your Watchlist Alerts</h2>
      {watchlist.length === 0 ? (
        <p>No stocks in your watchlist.</p>
      ) : (
        <ul>
          {watchlist.map((item, index) => (
            <li key={index}>
              {item.ticker}
              <button onClick={() => handleShowInput(item.ticker)}>
                {showInput[item.ticker] ? "Cancel" : "Set Alert"}
              </button>
              {showInput[item.ticker] && (
                <div>
                  <input
                    type="number"
                    placeholder="Set Trigger Price"
                    onChange={(e) =>
                      handleTriggerPriceChange(item.ticker, e.target.value)
                    }
                  />
                  <button onClick={() => setPriceAlert(item.ticker)}>
                    Confirm Alert
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Alerts;
