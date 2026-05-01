const { intializeDB } = require("../db/db.connect");
const mongoose = require("mongoose");

intializeDB();
// Tag Schema
const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, //
});
module.exports = mongoose.model("WorkasanaTag", tagSchema);
