const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    productImage: { type: String, required: true },
    price: { type: Number, min: 100, max: 1000, required: true },
    rating: { type: Number, min: 0, max: 5 },
    size: [{ type: String, enum: ["XS", "S", "M", "L", "XL"] }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    discountedPrice: { type: Number, min: 10, max: 40 },
  },
  { timestamps: true },
);

const Products = new mongoose.model("Products", productSchema);
module.exports = Products;
