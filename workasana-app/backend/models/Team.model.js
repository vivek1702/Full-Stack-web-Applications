const { intializeDB } = require("../db/db.connect");
const mongoose = require("mongoose");

intializeDB();

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
