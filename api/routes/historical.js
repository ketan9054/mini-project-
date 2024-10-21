// stockRoutes.js (add this route)

const express = require("express");
const axios = require("axios");
const router = express.Router();

// Assuming you have already set up your middleware for authentication

// Get historical price data for a given ticker
router.get("/historical/:ticker", async (req, res) => {
  const { ticker } = req.params;

  console.log("chart");
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY; // Ensure your API key is in environment variables

  // Fetch historical data from Alpha Vantage
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    // console.log(response);
    const data = response.data;
    // console.log(data);

    // Extract the historical prices
    if (data["Time Series (Daily)"]) {
      const prices = Object.entries(data["Time Series (Daily)"]).map(
        ([date, value]) => ({
          date,
          price: parseFloat(value["4. close"]), // Close price
        })
      );

      // Send the prices back to the client
      res.json({ prices });
    } else {
      res.status(400).json({ message: "Invalid ticker or no data available." });
    }
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({ message: "Error fetching historical data." });
  }
});

module.exports = router;
