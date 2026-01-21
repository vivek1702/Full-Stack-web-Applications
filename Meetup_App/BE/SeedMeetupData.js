const { intializeDB } = require("./db/db.connect");
const Meetup = require("./models/meetupApp.models");
const fs = require("fs");

const jsonData = fs.readFileSync("meetUpSeedData.json", "utf-8");
const meetupData = JSON.parse(jsonData);

intializeDB();

// seed multiple data using loop through "meetupSeedData.json" file
function seedData() {
  try {
    for (const i of meetupData) {
      const newData = new Meetup({
        eventTitle: i.eventTitle,
        eventType: i.eventType,
        hostedBy: i.hostedBy,
        speakers: i.speakers,
        eventImageUrl: i.eventImageUrl,
        details: i.description,
        additionalInformation: i.additionalInformation,
        tags: i.tags,
        startTime: i.startTime,
        endTime: i.endTime,
        location: i.location,
        isPaid: i.isPaid,
        price: i.price,
      });

      // console.log(newData);
      newData.save();
    }
  } catch (error) {
    console.log("unable to seed data", error);
  }
}
//seedData();
