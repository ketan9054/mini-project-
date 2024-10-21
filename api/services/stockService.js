// stockService.js
const axios = require("axios");

const fetchStockPrice = async (ticker) => {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY; // Store your API key in environment variables
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log("API response:", data);
    // Extract the latest price from the response
    const latestPrice =
      data["Time Series (1min)"][Object.keys(data["Time Series (1min)"])[0]][
        "1. open"
      ];
    return latestPrice;
  } catch (error) {
    console.error("Error fetching stock price:", error);
    throw error;
  }
};

module.exports = { fetchStockPrice };
