const mongoose = require("mongoose");
require("dotenv").config();

const intializeDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
module.exports = { intializeDB };
