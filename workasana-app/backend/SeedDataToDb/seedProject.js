const Project = require("../models/Project.model");
const { intializeDB } = require("../db/db.connect");
const mongoose = require("mongoose");

async function insertProjects() {
  //test insert
  try {
    await intializeDB();
    await Project.insertMany([
      {
        name: "Workasana Platform",
        description: "Task management system for teams and projects",
      },
      {
        name: "Customer Support Dashboard",
        description:
          "Dashboard to track and resolve customer issues efficiently",
      },
    ]);
    console.log("project inserted");
  } catch (error) {
    console.log("Project data insertion fail");
  } finally {
    mongoose.connection.close();
  }
}

insertProjects();
