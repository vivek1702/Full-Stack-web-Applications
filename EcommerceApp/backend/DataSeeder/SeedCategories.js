const Category = require("../models/category.model");
const { initializeDB } = require("../db/db.connect");
initializeDB();

const categoryData = [
  {
    name: "Men",
    slug: "men",
  },
  {
    name: "Women",
    slug: "women",
  },
  {
    name: "Kids",
    slug: "kids",
  },
];

async function insertCategories(categoryData) {
  try {
    await Category.insertMany(categoryData);
    console.log("categories seeded successfully");
    process.exit(0);
  } catch (error) {
    console.log("error seeding categories");
    process.exit(1);
  }
}

insertCategories(categoryData);
