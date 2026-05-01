const mongoose = require("mongoose");
const { intializeDB } = require("../db/db.connect");
const Task = require("../models/Task.model");

async function seedTasks() {
  try {
    await intializeDB();

    const tasks = [
      {
        name: "Resolve support tickets",
        project: "69e5fb4c4caa17bcdd786249",
        team: "69e5e1fe4272469c24ac89eb",
        owners: ["69e621a57ae6808e5f3ea767", "69e621a57ae6808e5f3ea766"],
        tags: ["Support", "Urgent"],
        timeToComplete: 2,
        status: "To Do",
      },
      {
        name: "Design landing page",
        project: "69e5fb4c4caa17bcdd786248",
        team: "69e5e2f845f9a34f9ecfe331",
        owners: ["69e621a57ae6808e5f3ea766"],
        tags: ["UI", "Design"],
        timeToComplete: 5,
        status: "In Progress",
      },
      {
        name: "Fix login authentication bug",
        project: "69e5fb4c4caa17bcdd786249",
        team: "69e5e314eb2d30c7e9c0db52",
        owners: ["69e621a57ae6808e5f3ea767"],
        tags: ["Bug", "Backend"],
        timeToComplete: 3,
        status: "To Do",
      },
      {
        name: "Prepare marketing campaign",
        project: "69e5fb4c4caa17bcdd786248",
        team: "69e5e1fe4272469c24ac89eb",
        owners: ["69e621a57ae6808e5f3ea767", "69e621a57ae6808e5f3ea766"],
        tags: ["Marketing", "Campaign"],
        timeToComplete: 6,
        status: "In Progress",
      },
      {
        name: "Database performance optimization",
        project: "69e5fb4c4caa17bcdd786249",
        team: "69e5e2f845f9a34f9ecfe331",
        owners: ["69e621a57ae6808e5f3ea766"],
        tags: ["Database", "Optimization"],
        timeToComplete: 4,
        status: "Blocked",
      },
    ];

    await Task.insertMany(tasks);

    console.log("Tasks seeded successfully");
  } catch (error) {
    console.log("Error seeding tasks:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedTasks();
