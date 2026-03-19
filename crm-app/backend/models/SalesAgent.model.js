const mongoose = require("mongoose");

const salesAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "sales agent name is required "],
  },
  email: {
    type: String,
    required: [true, "sales agent email is required"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sales Agent", salesAgentSchema);
