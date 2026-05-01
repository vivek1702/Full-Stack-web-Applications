const { intializeDB } = require("../db/db.connect");
const Team = require("../models/Team.model");

//test data
const newTeam = new Team({
  name: "Support",
  description: "Handle customer support issues",
});

const newTeam2 = new Team({
  name: "Development",
  description: "Responsible for building and maintaining the product",
});

const newTeam3 = new Team({
  name: "Marketing",
  description: "Handles promotions, campaigns, and brand growth",
});

newTeam3
  .save()
  .then((team) => console.log(team))
  .catch((error) => console.log(error));
