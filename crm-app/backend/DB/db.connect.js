const mongoose = require("mongoose");
require("dotenv").config();

async function initalizeDb() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("db connected successfully"))
    .catch((error) => console.log("connection failed", error));
}

module.exports = { initalizeDb };
