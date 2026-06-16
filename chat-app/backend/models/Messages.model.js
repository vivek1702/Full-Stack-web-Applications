const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
});

const Messages = mongoose.model("Messages", messageSchema);
module.exports = Messages;
