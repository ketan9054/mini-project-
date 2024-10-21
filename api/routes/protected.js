const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); // Adjust if necessary
console.log("Protected route accessed1");

const router = express.Router();

// Protected route
router.get("/protected", authMiddleware, (req, res) => {
  console.log("Protected route accessed2"); // Debugging output
  res.json({ message: "This is a protected route", userId: req.user.id });
});

module.exports = router;
