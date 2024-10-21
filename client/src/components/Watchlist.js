import React, { useEffect, useState } from "react";
import "./Watchlist.css"; // Import the CSS file

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [ticker, setTicker] = useState(""); // State to store the ticker input

  // Fetch the watchlist from the backend
  const fetchWatchlist = async () => {
    const token = localStorage.getItem("authToken"); // Get the auth token

    // Check if token exists
    if (!token) {
      console.error("No authentication token found.");
      return; // Exit if there's no token
    }

    try {
      // Make the GET request to fetch the watchlist
      const response = await fetch(
        "http://localhost:5000/api/users/watchlist",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
      );

      // Check if the response is okay (status code 200-299)
      if (response.ok) {
        const data = await response.json(); // Parse the JSON data
        setWatchlist(data.watchlist); // Set the watchlist state with the fetched data
      } else {
        // Log the error response from the server
        const errorData = await response.json(); // Attempt to parse the error response
        console.error("Failed to fetch watchlist:", errorData);
      }
    } catch (error) {
      // Log any network or other unexpected errors
      console.error("Error fetching watchlist:", error.message);
    }
  };

  // Fetch watchlist on component mount
  useEffect(() => {
    fetchWatchlist(); // Call the fetch function when the component mounts
  }, []);

  // Function to remove stock from watchlist
  const removeFromWatchlist = async (ticker) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `http://localhost:5000/api/users/watchlist/${ticker}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((item) => item.ticker !== ticker)
      );
    } else {
      console.error("Failed to remove stock from watchlist");
    }
  };

  // Function to fetch stock price from the API
  const fetchStockPrice = async (ticker) => {
    try {
      const response = await fetch(`http://localhost:5000/api/stock/${ticker}`); // Adjust the API endpoint as necessary
      const data = await response.json();
      return data.price; // Assuming the API returns the price in this format
    } catch (error) {
      console.error("Error fetching stock price:", error);
      return null;
    }
  };

  // Function to add stock to watchlist
  // const addToWatchlist = async (e) => {
  //   e.preventDefault(); // Prevent page reload

  //   const price = await fetchStockPrice(ticker); // Fetch the current price from the API
  //   if (!price) {
  //     alert("Failed to fetch stock price. Please try again.");
  //     return;
  //   }

  //   const token = localStorage.getItem("authToken");
  //   const response = await fetch("http://localhost:5000/api/users/watchlist", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({ ticker, price }), // Send ticker and price
  //   });

  //   if (response.ok) {
  //     const newStock = await response.json();
  //     setWatchlist((prevWatchlist) => [...prevWatchlist, newStock]); // Update watchlist state
  //     setTicker(""); // Clear input
  //   } else {
  //     console.error("Failed to add stock to watchlist");
  //   }
  // };

  const addToWatchlist = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Check if the stock is already in the watchlist
    const stockExists = watchlist.some(
      (item) => item.ticker === ticker.toUpperCase()
    );

    if (stockExists) {
      alert("Stock is already in your watchlist.");
      return; // Exit if the stock is already in the watchlist
    }

    const price = await fetchStockPrice(ticker); // Fetch the current price from the API
    if (!price) {
      alert("Failed to fetch stock price. Please try again.");
      return;
    }

    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:5000/api/users/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ticker, price }), // Send ticker and price
    });

    if (response.ok) {
      const newStock = await response.json();
      setWatchlist((prevWatchlist) => [...prevWatchlist, newStock]); // Update watchlist state
      setTicker(""); // Clear input
    } else {
      console.error("Failed to add stock to watchlist");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>Add Stocks</h1>
        <form onSubmit={addToWatchlist}>
          <input
            type="text"
            placeholder="Stock Ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())} // Ensure ticker is in uppercase
            required
            className="input"
          />
          <button type="submit" className="button">
            Add Stock
          </button>
        </form>
      </div>
      <div className="watchlist-container">
        {watchlist.length === 0 ? (
          <p>No stocks in your watchlist.</p>
        ) : (
          <ul className="list">
            {watchlist.map((item, index) => (
              <li key={index} className="list-item">
                {item.ticker} - ${item.price}
                <button
                  onClick={() => removeFromWatchlist(item.ticker)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
