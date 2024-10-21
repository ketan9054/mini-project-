// routes/alerts.js
const express = require("express");
const { setPriceAlert } = require("../controllers/alertsController");
const { authenticateUser } = require("../middleware/authMiddleware"); // Middleware to authenticate user

const router = express.Router();

router.post("/set", authenticateUser, setPriceAlert); // Set price alert

module.exports = router;
