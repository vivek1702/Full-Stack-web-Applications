const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const { Server } = require("socket.io");
const Messages = require("./models/Messages.model");
const ChatUsers = require("./models/User.model");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("db connected"))
  .catch((error) => console.log("db not connected", error));

app.use("/auth", authRoutes);

//io socket logic
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("send_message", async (data) => {
    console.log("Received data:", data);

    const { sender, receiver, message } = data;

    console.log(sender);
    console.log(receiver);
    console.log(message);

    const newMessage = new Messages({ sender, receiver, message });
    await newMessage.save();

    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.get("/messages", async (req, res) => {
  const { sender, receiver } = req.query;
  try {
    const messages = await Messages.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching message" });
  }
});

app.get("/users", async (req, res) => {
  const { currentUser } = req.query;

  try {
    const users = await ChatUsers.find({ username: { $ne: currentUser } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`app is connected to port ${PORT}`);
});
