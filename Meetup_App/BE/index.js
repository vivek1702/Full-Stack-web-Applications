// require("dns").setDefaultResultOrder("ipv4first");

//requirment for api
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//requirment for DB operations
const { intializeDB } = require("./db/db.connect");
const Meetup = require("./models/meetupApp.models");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

intializeDB();

/* -------- HEALTH CHECK -------- */
app.get("/api", (req, res) => {
  res.status(200).send("Meetup Backend running on Vercel 🚀");
});

//api method to read all the data from mongoDb schema
const allMeetupData = async () => {
  try {
    const showMeetupData = await Meetup.find();
    return showMeetupData;
  } catch (error) {
    console.log("not get movies from DB", error);
  }
};

app.get("/api/meetups", async (req, res) => {
  try {
    const showData = await allMeetupData();
    if (!showData) {
      res.status(400).json({ error: "unable to get data" });
    }
    res.json(showData);
  } catch (error) {
    res.status(500).json({ error: "unable to get data through api call" });
  }
});

//api method to get meetup data data by id
const MeetupByID = async (meetupID) => {
  try {
    const showData = await Meetup.findById(meetupID);
    return showData;
  } catch (error) {
    throw error;
  }
};

app.get("/api/meetups/:meetupId", async (req, res) => {
  try {
    const showMeetupData = await MeetupByID(req.params.meetupId);
    if (!showMeetupData) {
      res.status(400).json({ error: "unable to get data" });
    }
    res.json(showMeetupData);
  } catch (error) {
    res.status(500).json({ error: "unable to get data through api call" });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log("Server run locally on port", PORT);
  });
}

module.exports = app;
