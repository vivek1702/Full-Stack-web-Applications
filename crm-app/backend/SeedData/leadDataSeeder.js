const { initalizeDb } = require("../DB/db.connect");
const Lead = require("../models/Lead.model");

initalizeDb();

const dummyDataArray = [
  {
    name: "Globex Corporation",
    source: "Website",
    salesAgent: "69beafbd5876fe0dbd2dbf1a",
    status: "Contacted",
    tags: ["Enterprise", "Hot Lead"],
    timeToClose: 25,
    priority: "High",
  },
  {
    name: "Initech",
    source: "Cold Call",
    salesAgent: "69c11dc001cedc61eef7e391",
    status: "New",
    tags: ["Follow-up"],
    timeToClose: 40,
    priority: "Medium",
  },
  {
    name: "Umbrella Corp",
    source: "Referral",
    salesAgent: "69beb68397652372feeac39a",
    status: "Qualified",
    tags: ["High Value"],
    timeToClose: 15,
    priority: "High",
  },
  {
    name: "Soylent Corp",
    source: "Advertisement",
    salesAgent: "69bc0632625dfd6a9e3c0251",
    status: "Proposal Sent",
    tags: ["Cold Lead"],
    timeToClose: 50,
    priority: "Low",
  },
  {
    name: "Hooli",
    source: "Email",
    salesAgent: "69beafbd5876fe0dbd2dbf1a",
    status: "Closed",
    tags: ["Enterprise", "Repeat Client"],
    timeToClose: 10,
    priority: "High",
  },
  {
    name: "Stark Industries",
    source: "Website",
    salesAgent: "69beb68397652372feeac39a",
    status: "Contacted",
    tags: ["High Value", "Urgent"],
    timeToClose: 20,
    priority: "High",
  },
  {
    name: "Wayne Enterprises",
    source: "Other",
    salesAgent: "69c11dc001cedc61eef7e391",
    status: "Qualified",
    tags: ["VIP"],
    timeToClose: 35,
    priority: "Medium",
  },
  {
    name: "Wonka Industries",
    source: "Referral",
    salesAgent: "69bc0632625dfd6a9e3c0251",
    status: "New",
    tags: ["Follow-up", "Potential"],
    timeToClose: 45,
    priority: "Low",
  },
  {
    name: "Tyrell Corporation",
    source: "Cold Call",
    salesAgent: "69beafbd5876fe0dbd2dbf1a",
    status: "Proposal Sent",
    tags: ["AI Sector"],
    timeToClose: 28,
    priority: "Medium",
  },
  {
    name: "Cyberdyne Systems",
    source: "Advertisement",
    salesAgent: "69beb68397652372feeac39a",
    status: "Closed",
    tags: ["Tech", "Strategic"],
    timeToClose: 12,
    priority: "High",
  },
];

async function seedDataToLead(dummyDataArray) {
  try {
    const result = await Lead.insertMany(dummyDataArray);
    console.log("Bulk data inserted successfully");
    return result;
  } catch (error) {
    console.error("Error inserting bulk data:", error.message);
  }
}

seedDataToLead(dummyDataArray);
