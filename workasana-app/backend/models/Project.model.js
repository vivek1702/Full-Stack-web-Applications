const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  status: {
    type: String,
    enum: ["Active", "Completed", "Archived"],
    default: "Active",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);
