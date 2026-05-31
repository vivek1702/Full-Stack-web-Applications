const mongoose = require("mongoose");
const { initialzeDb } = require("../db/db.connect");
const Jobs = require("../models/Jobs.models");

const seederData = [
  {
    title: "Backend Developer",
    details: {
      CompanyName: "TechNova Solutions",
      location: "Bangalore",
      salary: 1200000,
      type: "Full - time(On - site)",
    },
    description:
      "Develop and maintain scalable backend services using Node.js and MongoDB. Collaborate with frontend developers and product teams to build high-quality applications.",
    qualifications:
      "Strong knowledge of Node.js, Express.js, MongoDB, REST APIs, and Git. Minimum 2 years of backend development experience.",
    createdBy: "6839d4a9b8f2a1c123456789",
  },

  {
    title: "Frontend Developer",
    details: {
      CompanyName: "PixelCraft Technologies",
      location: "Hyderabad",
      salary: 900000,
      type: "Full - time(Remote)",
    },
    description:
      "Build responsive and user-friendly web applications using React. Work closely with UI/UX designers to implement modern interfaces.",
    qualifications:
      "Experience with React, JavaScript, HTML, CSS, and state management libraries. Understanding of REST APIs.",
    createdBy: "6839d4a9b8f2a1c123456789",
  },

  {
    title: "Data Analyst",
    details: {
      CompanyName: "Insight Analytics",
      location: "Pune",
      salary: 850000,
      type: "Full - time(On - site)",
    },
    description:
      "Analyze business data, create dashboards, and provide actionable insights to stakeholders.",
    qualifications:
      "Proficiency in SQL, Excel, Power BI, and basic Python. Experience with data visualization and reporting.",
    createdBy: "6839d4a9b8f2a1c123456789",
  },

  {
    title: "DevOps Engineer",
    details: {
      CompanyName: "CloudEdge Systems",
      location: "Chennai",
      salary: 1500000,
      type: "Full - time(Remote)",
    },
    description:
      "Manage CI/CD pipelines, cloud infrastructure, monitoring systems, and deployment automation.",
    qualifications:
      "Experience with AWS, Docker, Kubernetes, Linux, GitHub Actions, and monitoring tools such as Grafana.",
    createdBy: "6839d4a9b8f2a1c123456789",
  },
];

async function seedJobs(seederData) {
  try {
    initialzeDb();
    const result = await Jobs.insertMany(seederData);
    console.log("data added successfully");
  } catch (error) {
    console.log("data not inserted, check data accuracy");
  }
}

seedJobs(seederData);
