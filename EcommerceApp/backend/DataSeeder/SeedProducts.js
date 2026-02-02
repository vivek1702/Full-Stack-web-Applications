const Products = require("../models/product.model");
const { initializeDB } = require("../db/db.connect");
const fs = require("fs");

initializeDB();

const jsonData = fs.readFileSync("productData.json", "utf8");
const productData = JSON.parse(jsonData);

async function seedProduct(productData) {
  try {
    await Products.insertMany(productData);
    console.log("product data added successfully");
    process.exit(0);
  } catch (error) {
    console.log("product data is not added", error);
    process.exit(1);
  }
}
seedProduct(productData);
