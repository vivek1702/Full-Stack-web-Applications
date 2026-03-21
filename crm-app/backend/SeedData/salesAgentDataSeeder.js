const { initalizeDb } = require("../DB/db.connect");
const SalesAgent = require("../models/SalesAgent.model");

initalizeDb();

const newData = {
  name: "John Doe",
  email: "john@example.com",
};

async function seedSalesAgentData(newData) {
  const newDataToSeed = new SalesAgent(newData);
  await newDataToSeed.save();
  console.log("data saved");
}

seedSalesAgentData(newData);
