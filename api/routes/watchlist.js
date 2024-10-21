// routes/watchlistRoutes.js
const express = require("express");
const Watchlist = require("../models/Watchlist");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get the user's watchlist
router.get("/watchlist", authMiddleware, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.user.id });
    res.json({ watchlist });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Add a stock to the user's watchlist
router.post("/watchlist", authMiddleware, async (req, res) => {
  const { ticker, price } = req.body;

  try {
    const newStock = new Watchlist({
      userId: req.user.id,
      ticker,
      price,
    });

    await newStock.save();
    res.json(newStock);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// router.post("/watchlist", authMiddleware, async (req, res) => {
//   const { ticker, price } = req.body;

//   try {
//     // Check if the stock already exists in the user's watchlist
//     const existingStock = await Watchlist.findOne({
//       userId: req.user.id,
//       ticker,
//     });

//     if (existingStock) {
//       return res
//         .status(400)
//         .json({ error: "Stock is already in your watchlist" });
//     }

//     // If not already in the watchlist, add the new stock
//     const newStock = new Watchlist({
//       userId: req.user.id,
//       ticker,
//       price,
//     });

//     await newStock.save();
//     res.json(newStock);
//   } catch (err) {
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// });

// Remove a stock from the user's watchlist
router.delete("/watchlist/:ticker", authMiddleware, async (req, res) => {
  const { ticker } = req.params;

  try {
    const result = await Watchlist.findOneAndDelete({
      userId: req.user.id,
      ticker,
    });

    if (!result) {
      return res.status(404).json({ error: "Stock not found" });
    }

    res.json({ message: "Stock removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = router;
