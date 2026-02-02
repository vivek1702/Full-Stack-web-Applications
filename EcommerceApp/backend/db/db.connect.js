const mongoose = require("mongoose");
require("dotenv").config();

async function initializeDB() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("db connected successfully"))
    .catch((error) => console.log("unable to connect", error));
}

module.exports = { initializeDB };
