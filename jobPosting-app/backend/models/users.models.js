const mongoose = require("mongoose");
const { initialzeDb } = require("../db/db.connect");

const userModel = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["employer", "candidate"] },
  },
  { timestamps: true },
);

module.exports = new mongoose.model("JobsUsers", userModel);
