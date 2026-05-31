const mongoose = require("mongoose");
require("dotenv").config({ path: "./backend/.env" });

async function initialzeDb() {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("database connected"))
    .catch((error) => console.log("unable to connect to db", error));
}

module.exports = { initialzeDb };
