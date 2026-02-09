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

// insertCategories(categoryData);

//update category database with  adding imageUrl field and seeding data
const categoryUpdates = [
  {
    slug: "men",
    categoryURL: "https://placehold.co/600x900/eeeeee/111111?text=Men",
  },
  {
    slug: "women",
    categoryURL: "https://placehold.co/600x900/f5f5f5/111111?text=Women",
  },
  {
    slug: "kids",
    categoryURL: "https://placehold.co/600x900/ffffff/111111?text=Kids",
  },
];

async function updateCategories(categoryUpdates) {
  try {
    for (const category of categoryUpdates) {
      await Category.updateOne(
        { slug: category.slug },
        { $set: { categoryURL: category.categoryURL } },
      );
    }
    console.log("data updated successfully");
    process.exit(0);
  } catch (error) {
    console.log("error updating categories");
    process.exit(0);
  }
}
updateCategories(categoryUpdates);
