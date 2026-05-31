const mongoose = require("mongoose");
const { initialzeDb } = require("../db/db.connect");

//initialzeDb();

const jobsModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    details: {
      CompanyName: { type: String, required: true },
      location: { type: String, required: true },
      salary: { type: Number, required: true, min: 200000 },
      type: {
        type: String,
        enum: [
          "Full - time(On - site)",
          "Part - time(On - site)",
          "Full - time(Remote)",
          "Part - time(Remote)",
        ],
        default: "Full - time(On - site)",
        required: true,
      },
    },
    description: { type: String, required: true },
    qualifications: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobsUsers",
      required: true,
    },
  },
  { timestamps: true },
);

const Jobs = new mongoose.model("Jobs", jobsModel);
module.exports = Jobs;
