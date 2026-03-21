const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Lead name is required"] },
  source: {
    type: String,
    required: [true, "Lead source is required"],
    enum: [
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
    enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"],
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

// Middleware to update the `updatedAt` field on each save
leadSchema.pre("save", async function () {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model("Lead", leadSchema);
