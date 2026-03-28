const Tag = require("../models/Tags.model");
const { initalizeDb } = require("../DB/db.connect");

initalizeDb();

const tags = [
  { name: "Hot Lead" },
  { name: "Cold Lead" },
  { name: "Warm Lead" },
  { name: "High Value" },
  { name: "Low Budget" },
  { name: "Follow-Up Required" },
  { name: "Interested" },
  { name: "Not Interested" },
  { name: "Demo Scheduled" },
  { name: "Negotiation Stage" },
  { name: "Closed Won" },
  { name: "Closed Lost" },
  { name: "New Lead" },
  { name: "Returning Customer" },
  { name: "Referral" },
  { name: "Urgent" },
  { name: "Long-Term Prospect" },
  { name: "Decision Maker" },
  { name: "Needs Nurturing" },
  { name: "Unresponsive" },
];

async function seedTags() {
  try {
    await Tag.insertMany(tags);
    console.log("Tags inserted successfully");
  } catch (err) {
    console.error(err);
  }
}

seedTags();
