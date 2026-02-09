const Products = require("../models/product.model");
const { initializeDB } = require("../db/db.connect");
const fs = require("fs");

initializeDB();

// const jsonData = fs.readFileSync("productData.json", "utf8");
// const productData = JSON.parse(jsonData);

// async function seedProduct(productData) {
//   try {
//     await Products.insertMany(productData);
//     console.log("product data added successfully");
//     process.exit(0);
//   } catch (error) {
//     console.log("product data is not added", error);
//     process.exit(1);
//   }
// }
// seedProduct(productData);

const updateDiscountField = [
  { discountPrice: 15 },
  { discountPrice: 20 },
  { discountPrice: 25 },
  { discountPrice: 30 },
  { discountPrice: 18 },
  { discountPrice: 22 },
  { discountPrice: 35 },
  { discountPrice: 40 },
  { discountPrice: 12 },
  { discountPrice: 28 },
  { discountPrice: 33 },
  { discountPrice: 17 },
  { discountPrice: 26 },
  { discountPrice: 38 },
  { discountPrice: 19 },
  { discountPrice: 24 },
  { discountPrice: 32 },
  { discountPrice: 14 },
];

async function updateProductsWithDiscount() {
  try {
    const products = await Products.find();

    for (let i = 0; i < products.length; i++) {
      await Products.updateOne(
        { _id: products[i]._id },
        { $set: { discountedPrice: updateDiscountField[i].discountPrice } },
      );
    }

    console.log("data updated successfully");
    process.exit(0);
  } catch (error) {
    console.log("error updating products", error);
    process.exit(1);
  }
}
updateProductsWithDiscount();
