const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { timestamps: true },
);

const Address = new mongoose.model("Address", addressSchema);
module.exports = Address;
