const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging line

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
