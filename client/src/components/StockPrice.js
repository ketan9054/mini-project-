// src/components/StockPrice.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const StockPrice = ({ ticker }) => {
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/stock/${ticker}`
        );
        // console.log(response.data.price);
        setPrice(response.data.price);
        setError(null); // Clear previous error if the fetch is successful
      } catch (error) {
        setError("Error fetching stock price. Please check the ticker symbol.");
        setPrice(null); // Reset price on error
      }
    };

    fetchPrice();
  }, [ticker]);

  return (
    <div>
      <h2>Stock Price for {ticker}</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : price ? (
        <p>${price}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockPrice;
