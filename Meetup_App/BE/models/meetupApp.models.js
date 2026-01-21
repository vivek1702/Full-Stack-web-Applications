const mongoose = require("mongoose");

const details = new mongoose.Schema(
  {
    eventTitle: { type: String, required: true },
    eventType: { type: String, enum: ["Online", "Offline", "Both"] },
    hostedBy: { type: String, required: true },
    speakers: [
      {
        firstName: String,
        lastName: String,
        profilePicture: String,
        designation: String,
      },
    ],
    eventImageUrl: { type: String, required: true },
    details: { type: String, required: true },
    additionalInformation: { dressCode: String, ageRestriction: String },
    tags: [{ type: String }],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: { venue: String, city: String, fullAddress: String },
    isPaid: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Meetup = new mongoose.model("Meetup", details);
module.exports = Meetup;
