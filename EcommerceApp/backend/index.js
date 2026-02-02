require("dotenv").config();
const Products = require("./models/product.model");
const Category = require("./models/category.model");
const { initializeDB } = require("./db/db.connect");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    Credential: true,
  }),
);
app.use(express.json());

initializeDB();

//read all the products from db
async function allProducts() {
  try {
    const showProducts = await Products.find();
    return showProducts;
  } catch (error) {
    console.log("unable to fetch data from db");
  }
}

app.get("/api/products", async (req, res) => {
  try {
    const showData = await allProducts();
    if (!showData) {
      res.status(400).json({ error: "unable to get data" });
    }
    res.json(showData);
  } catch (error) {
    res.status(501).json({ error: "unable to fetch from api" });
  }
});

//read data by productId from db
async function productById(productId) {
  try {
    const showData = await Products.findOne({ _id: productId });
    return showData;
  } catch (error) {
    throw error;
  }
}
app.get("/api/products/:productId", async (req, res) => {
  try {
    const getId = req.params.productId;
    const showData = await productById(getId);
    if (showData) {
      res.json(showData);
      res.status(200).json({ message: "fetched result" });
    } else {
      res.status(400).json({ error: "id is not in DB" });
    }
  } catch (error) {
    res.status(501).json({ error: "found error while fetching data" });
  }
});

//read all data of category
async function allCategories() {
  try {
    const showCategories = await Category.find();
    return showCategories;
  } catch (error) {
    console.log("unable to fetch data from db");
  }
}

app.get("/api/categories", async (req, res) => {
  try {
    const showData = await allCategories();
    if (!showData) {
      res.status(400).json({ error: "unable to get data" });
    }
    res.json(showData);
  } catch (error) {
    res.status(501).json({ error: "unable to fetch from api" });
  }
});

//read data by categoryId from db
async function CategoryById(categoryId) {
  try {
    const showData = await Category.findOne({ _id: categoryId });
    return showData;
  } catch (error) {
    console.log("unable to fetch data from db", error);
  }
}
app.get("/api/categories/:categoryId", async (req, res) => {
  try {
    const getId = req.params.categoryId;
    const showData = await CategoryById(getId);
    if (showData) {
      res.status(200).json(showData);
    } else {
      res.status(400).json({ error: "id is not in DB" });
    }
  } catch (error) {
    res.status(501).json({ error: "found error while fetching data" });
  }
});

//Get Products by Category
app.get("/api/products/categories/:categoryId", async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Products.find({ category: categoryId });
    if (products.length === 0) {
      res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "error fetching products" });
  }
});

//app running port
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log("app is running on port", PORT);
  });
}
module.exports = app;
