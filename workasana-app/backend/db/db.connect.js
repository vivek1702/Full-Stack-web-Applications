const mongoose = require("mongoose");
require("dotenv").config();

async function intializeDB() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("db connected successfully"))
    .catch((error) => console.log("db not connected error", error));
}

module.exports = { intializeDB };
