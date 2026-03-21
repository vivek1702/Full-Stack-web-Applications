const { initalizeDb } = require("../DB/db.connect");
const Lead = require("../models/Lead.model");

initalizeDb();

const dummyData = {
  name: "Acme Corp",
  source: "Referral",
  salesAgent: "69bc0632625dfd6a9e3c0251", // Sales Agent ID
  status: "New",
  tags: ["High Value", "Follow-up"],
  timeToClose: 30,
  priority: "High",
};

async function SeedDataToLeed(dummyData) {
  const newData = new Lead(dummyData);
  console.log("data saved ");
  await newData.save();
}

SeedDataToLeed(dummyData);
