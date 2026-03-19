const mongoose = require("mongoose");
const { type } = require("node:os");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Lead name is required"] },
  source: {
    type: String,
    required: [true, "Lead source is required"],
    enums: [
      "Website",
      "Referral",
      "Cold Call",
      "Advertisement",
      "Email",
      "Other",
    ],
  },
  salesAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SalesAgent",
    required: [true, "sales agent is required"],
  },

  status: {
    type: String,
    enums: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
    required: true,
    default: "New",
  },
  tags: {
    type: [String],
  },
  timeToClose: {
    type: Number,
    required: [true, "Time to Close is required"],
    min: [1, "Time to Close must be a positive number"], // Positive integer validation
  },
  priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: {
    type: Date,
  },
});

leadSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Lead", leadSchema);
