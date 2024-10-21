import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Using Chart.js for charts
import "chart.js/auto"; // Import required for Chart.js
import "./PriceChart.css"; // Import any CSS you need

const apiKey = process.env.REACT_APP_ALPHAVANTAGE_API_KEY;

const PriceChart = () => {
  const [watchlist, setWatchlist] = useState([]); // User's watchlist
  const [chartData, setChartData] = useState(null); // Data for the chart
  const [selectedStock, setSelectedStock] = useState(""); // Currently selected stock for chart
  const [loading, setLoading] = useState(false); // Loading state for chart

  // Fetch the user's watchlist
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

  // Fetch the stock's historical data for the chart
  const fetchStockChartData = async (ticker) => {
    setLoading(true); // Show loading while fetching data
    // const API_KEY = "5OIR3Y7JIG9MDVN1"; // Replace with your actual Alpha Vantage API key
    const API_KEY = apiKey;

    const interval = "1min"; // Set the desired interval (1min, 5min, etc.)

    try {
      // Fetch stock data from Alpha Vantage API
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${interval}&apikey=${API_KEY}`
      );

      const data = await response.json();

      // Check if the API returned the correct data
      if (data["Time Series (1min)"]) {
        const timeSeries = data["Time Series (1min)"];

        // Prepare the data for Chart.js
        const dates = Object.keys(timeSeries); // Get all the date keys
        const prices = dates.map((date) => timeSeries[date]["4. close"]); // Get closing prices for each date

        const chartData = {
          labels: dates.reverse(), // Reverse to display in chronological order
          datasets: [
            {
              label: `${ticker} Stock Price`,
              data: prices.reverse(), // Reverse to match dates
              borderColor: "rgba(75, 192, 192, 1)", // Customize chart appearance
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.1,
            },
          ],
        };

        setChartData(chartData); // Set chart data for display
        setSelectedStock(ticker); // Set the selected stock
      } else {
        console.error("Error fetching stock chart data:", data);
      }
    } catch (error) {
      console.error("Error fetching stock chart data:", error);
    }
    setLoading(false); // Hide loading when data is ready
  };

  // Fetch watchlist on component mount
  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="price-chart-container">
      {/* Display the user's watchlist with buttons to view the chart */}
      <div className="watchlist-container">
        <h2>Stocks from Watchlist</h2>
        {watchlist.length === 0 ? (
          <p>No stocks in your watchlist.</p>
        ) : (
          <ul className="watchlist">
            {watchlist.map((item, index) => (
              <li key={index}>
                {item.ticker}
                <button
                  className="view-chart-button"
                  onClick={() => fetchStockChartData(item.ticker)}
                >
                  View Chart
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display the chart if data is available */}
      {loading ? (
        <p>Loading chart...</p>
      ) : (
        chartData && (
          <div className="chart-container">
            <h2>{selectedStock} Price Chart</h2>
            <Line data={chartData} />
          </div>
        )
      )}
    </div>
  );
};

export default PriceChart;
