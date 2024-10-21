// api/routes/stockRoutes.js
const express = require("express");
const { fetchStockPrice } = require("../services/stockService"); // Adjust the path if necessary

const router = express.Router();

// Route to fetch the stock price for a specific ticker
router.get("/stock/:ticker", async (req, res) => {
  const ticker = req.params.ticker;

  try {
    const price = await fetchStockPrice(ticker);
    res.json({ ticker, price });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stock price" });
  }
});

module.exports = router;
