const WorkasanaTag = require("../models/Tag.model");

async function insertTags() {
  try {
    //example data
    await WorkasanaTag.insertMany(
      [
        //Priority
        { name: "Urgent" },
        { name: "High Priority" },
        { name: "Medium Priority" },
        { name: "Low Priority" },

        //Task Type
        { name: "Bug" },
        { name: "Feature" },
        { name: "Enhancement" },
        { name: "Task" },
        { name: "Improvement" },

        //Team / Department
        { name: "Support" },
        { name: "Marketing" },
        { name: "Sales" },
        { name: "Development" },
        { name: "Design" },
        { name: "QA" },

        //Workflow / Status
        { name: "To Do" },
        { name: "In Progress" },
        { name: "Blocked" },
        { name: "Review" },
        { name: "Completed" },

        //Technical / Area
        { name: "Frontend" },
        { name: "Backend" },
        { name: "API" },
        { name: "Database" },
        { name: "DevOps" },

        //Project-specific / Business
        { name: "Customer Issue" },
        { name: "Internal Task" },
        { name: "Research" },
        { name: "Analytics" },
        { name: "Documentation" },
      ],
      { ordered: false },
    );

    console.log("Tags inserted successfully");
  } catch (error) {
    console.log("Tag insertion error:", error.message);
  }
}

insertTags();
