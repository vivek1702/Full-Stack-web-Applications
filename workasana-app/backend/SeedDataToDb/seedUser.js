const { intializeDB } = require("../db/db.connect");
const Users = require("../models/User.model");
const mongoose = require("mongoose");

const usersData = [
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    password: "rahul123",
  },
  {
    name: "Priya Verma",
    email: "priya.verma@example.com",
    password: "priya123",
  },
];

async function seedUsers() {
  try {
    await intializeDB();

    // 🧹 delete existing users
    await Users.deleteMany({});
    console.log("Old users deleted");

    // ➕ insert new users
    await Users.insertMany(usersData);
    console.log("Users inserted successfully");
  } catch (error) {
    console.log(" Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedUsers();
