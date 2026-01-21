const mongoose = require("mongoose");
require("dotenv").config();

mongoUri = process.env.MONGODB;

const intializeDB = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("connected to db"))
    .catch((error) => console.log("unable to connect to DB", error));
};
module.exports = { intializeDB };
