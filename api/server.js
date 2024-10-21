const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth"); // Ensure this path is correct
const protectedRoutes = require("./routes/protected");

const stockRoutes = require("./routes/stockRoutes"); // Import stock routes
const watchlistRoutes = require("./routes/watchlist");
const historical = require("./routes/historical");

// const alertsRoutes = require("./routes/alerts");
// const cron = require("node-cron");

// const { checkPriceAlerts } = require("./controllers/alertsController");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Authentication Routes
app.use("/auth", authRoutes); // Use /auth as the prefix for auth routes
app.use("/api", protectedRoutes);
app.use("/api", stockRoutes); // Use /api as the prefix for stock routes

app.use("/api/users", watchlistRoutes);
app.use("/api/stock", historical);
// app.use("/api/alerts", alertsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI) // Removed deprecated options
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`); // Log all incoming requests
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
