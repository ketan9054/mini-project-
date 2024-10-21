// models/PriceAlert.js
const mongoose = require("mongoose");

const PriceAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user
  ticker: { type: String, required: true }, // Stock ticker symbol
  alertPrice: { type: Number, required: true }, // Price at which to alert
  notified: { type: Boolean, default: false }, // Whether the user has been notified
});

module.exports = mongoose.model("PriceAlert", PriceAlertSchema);
