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

//api method to read all the data from mongoDb schema
const allMeetupData = async () => {
  try {
    const showMeetupData = await Meetup.find();
    return showMeetupData;
  } catch (error) {
    console.log("not get movies from DB", error);
  }
};

app.get("/meetups", async (req, res) => {
  try {
    const showData = await allMeetupData();
    if (!showData) {
      res.send(400).json({ error: "unable to get data" });
    }
    res.json(showData);
  } catch (error) {
    res.send(500).json({ error: "unable to get data through api call" });
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

app.get("/meetups/:meetupId", async (req, res) => {
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("running on server port", PORT);
});
