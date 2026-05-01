require("dotenv").config();
const { intializeDB } = require("./db/db.connect");
const Project = require("./models/Project.model");
const Tag = require("./models/Tag.model");
const Task = require("./models/Task.model");
const Team = require("./models/Team.model");
const User = require("./models/User.model");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

intializeDB();

//signup
app.post("/api/auth/signup", async (req, res) => {
  const signupDetails = req.body;

  //checking if required information given or not
  if (!signupDetails.name || !signupDetails.email || !signupDetails.password) {
    return res.status(400).json({ error: "missing information" });
  }

  //checking if user exist or not
  const existingUser = await User.findOne({ email: signupDetails.email });
  if (existingUser) {
    return res.status(409).json({ message: "User exits" });
  }

  try {
    //hashing password
    const hashedPassword = await bcrypt.hash(signupDetails.password, 10);

    const payload = {
      name: signupDetails.name,
      email: signupDetails.email,
      password: hashedPassword,
    };
    const newUser = new User(payload);
    const result = await newUser.save();
    res.status(200).json({
      message: "User added",
      data: { name: result.name, email: result.email },
    });
  } catch (error) {
    return res.status(400).json({ error: "invalid request" });
  }
});

//middleware to verify user
const verifyJWT = async (req, res, next) => {
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1]; //expect this -> Authorization: Bearer <token>
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    console.log(token);
    const detoken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = detoken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token provided" });
  }
};

// login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // find user
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // generate token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      message: "Access granted",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//after login
app.get("/api/auth/me", verifyJWT, async (req, res) => {
  res.json({
    message: "Protected route accessible",
    user: req.user,
  });
});

//create task and protecting route
app.post("/api/task", verifyJWT, async (req, res) => {
  try {
    const {
      name,
      projectId,
      team,
      owners = [],
      tags = [],
      timeToComplete,
      status,
    } = req.body;

    if (!name || !projectId || !team || !timeToComplete || !status) {
      return res.status(400).json({ error: "All Fields are required" });
    }

    //add users to owners
    // const allMembers = [...new Set([...owners, req.user.userId])];
    //different way of writing above line in 3 step here
    // const combined = [...members, req.user.userId];
    // const uniqueMembers = new Set(combined);
    // const allMembers = [...uniqueMembers];
    if (owners.length === 0) {
      return res.status(400).json({ message: "At least one owner required" });
    }

    //validate users
    const validUsers = await User.find({ _id: { $in: owners } });
    if (validUsers.length !== owners.length) {
      return res.status(400).json({ message: "Invalid user IDs" });
    }

    //validate team
    const teamData = await Team.findById(team);
    if (!teamData) {
      return res.status(400).json({ message: "Invalid team" });
    }

    //ensure owner belongs to the team
    const isValid = owners.every((id) => teamData.members.includes(id));
    if (!isValid) {
      return res.status(400).json({
        message: "Owners must belong to selected team",
      });
    }

    //Validate project
    const projectData = await Project.findById(projectId);
    if (!projectData) {
      return res.status(400).json({ message: "Invalid project" });
    }

    const payload = {
      name,
      projectId,
      team,
      owners: allMembers,
      tags,
      timeToComplete,
      status,
    };

    const insertTask = new Task(payload);
    const result = await insertTask.save();

    res.status(200).json({ message: "new task added", result });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get task as per filters
app.get("/api/task", verifyJWT, async (req, res) => {
  try {
    const { name, project, team, owners, tags, timeToComplete, status } =
      req.query;

    let filter = {};

    //check is user is not admin
    if (req.user.role !== "admin") {
      //apart from owner checking for other users involved in task
      const userTeams = await Team.find({ members: req.user.userId }).select(
        "_id",
      );
      const teamIds = userTeams.map((item) => item._id);
      filter.$or = [{ owners: req.user.userId }, { team: { $in: teamIds } }];
    }

    // filtering
    if (team) filter.team = team;
    if (owners) filter.owners = owners;
    if (project) filter.project = project;
    if (status) filter.status = status;
    if (timeToComplete) filter.timeToComplete = timeToComplete;
    if (tags) filter.tags = { $in: [tags] };

    const task = await Task.find(filter);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//update task by id
app.put("/api/task/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, project, team, owners, tags, timeToComplete, status } =
      req.body;

    const task = await Task.findbyId(id);
    if (!task) {
      return res.status(400).json({ error: "task not found" });
    }

    if (req.user.role !== "admin" || !task.owners.include(req.user.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updateData = {};

    if (name) updateData.name = name;
    if (tags) updateData.tags = tags;
    if (timeToComplete) updateData.timeToComplete = timeToComplete;
    if (status) updateData.status = status;

    if (req.user.role === "admin") {
      if (owners) updateData.owners = owners;
      if (team) updateData.team = team;
      if (project) updateData.project = project;
    }

    const updatedDetails = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updatedDetails);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//delete task by id
app.delete("/api/task/:id", verifyJWT, async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    //Authorization lock
    if (req.user.role !== "admin" && !task.owners.includes(req.user.userId)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Task.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Successfully deleted",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

//create team
app.post("/api/teams", verifyJWT, async (req, res) => {
  try {
    const { name, description, members = [] } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "not authrozise" });
    }

    //add creators to member
    const allMembers = [...new Set([...members, req.user.userId])];

    //different way of writing above line in 3 step here
    // const combined = [...members, req.user.userId];
    // const uniqueMembers = new Set(combined);
    // const allMembers = [...uniqueMembers];

    //validate user
    const validateUser = await User.find({ _id: { $in: allMembers } });

    if (validateUser.length !== allMembers.length) {
      return res.status(400).json({ message: "Invalid user IDs" });
    }

    const addTeam = {
      name: name,
      description: description,
      members: allMembers,
    };
    const insertTeam = new Team(addTeam);
    const result = await insertTeam.save();

    res.status(201).json({
      message: "Team created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// add project
app.post("/api/projects", verifyJWT, async (req, res) => {
  try {
    const { name, description, createdBy, team } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingProject = await Project.findOne({ name });
    if (existingProject) {
      return res.status(401).json({ message: "Project already exist" });
    }

    const newProject = { name, description, createdBy: req.user.userId, team };
    const savedProject = new Project(newProject);
    const result = await savedProject.save();
    res
      .status(201)
      .json({ message: "project added successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get projects
app.get("/api/projects", verifyJWT, async (req, res) => {
  try {
    let filter = {};
    if (req.user.role !== "admin") {
      const userTeam = await Team.find({ members: req.user.userId }).select(
        "_id",
      );
      const teamId = userTeam.map((item) => item._id);

      filter.$or = [{ createdBy: req.user.userId }, { team: { $in: teamId } }];
    }
    const projects = await Project.find(filter);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//add tags
app.post("/api/tags", verifyJWT, async (req, res) => {
  try {
    let { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Tag name is required" });
    }

    name = name.trim().toLowerCase();

    // check duplicate
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(409).json({ message: "Tag already exists" });
    }

    const newTag = new Tag({ name });
    const savedTag = await newTag.save();

    res.status(201).json({
      message: "Tag created successfully",
      data: savedTag,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//get all the tags
app.get("/api/tags", verifyJWT, async (req, res) => {
  try {
    const tags = await Tag.find().sort({ name: 1 });

    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/report/last-week", verifyJWT, async (req, res) => {
  try {
    const filter = {
      status: "Completed",
      updatedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    };

    if (req.user.role !== "admin") {
      const userTeams = await Team.find({
        members: req.user.userId,
      }).select("_id");

      const teamId = userTeams.map((t) => t._id);
      filter.$or = [{ owners: req.user.userId }, { team: { $in: teamId } }];
    }

    const recentTasks = await Task.find(filter).sort({ updatedAt: -1 });
    res.status(200).json(recentTasks);

    //filter as normal user
    //     {
    //   status: "Completed",
    //   updatedAt: { $gte: last7days },
    //   $or: [
    //     { owners: userId },
    //     { team: { $in: teamIds } }
    //   ]
    // }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/report/pending", verifyJWT, async (req, res) => {
  try {
    //first lets match the status
    const matchStage = { status: { $ne: "Completed" } };

    if (req.user.role !== "admin") {
      const userTeams = await Team.find({ members: req.user.userId }).select(
        "_id",
      );
      const teamIds = userTeams.map((t) => t._id);
      matchStage.$or = [
        { owners: req.user.userId },
        { team: { $in: teamIds } },
      ];
    }

    const result = await Task.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalDaysPending: { $sum: "$timeToComplete" },
          totalTask: { $sum: 1 },
        },
      },
    ]);
    res.json(result[0] || { totalPendingDays: 0, totalTasks: 0 });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//total task closed by team
app.get("/api/report/closed-by-team", verifyJWT, async (req, res) => {
  try {
    let matchData = { status: "Completed" };

    if (req.user.role !== "admin") {
      const userTeams = await Team.find({
        members: req.user.userId,
      }).select("_id");

      const teamIds = userTeams.map((t) => t._id);

      matchData.$or = [{ owners: req.user.userId }, { team: { $in: teamIds } }];
    }

    const result = await Task.aggregate([
      { $match: matchData },
      {
        $group: {
          _id: "$team",
          totalClosed: { $sum: 1 },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//total task by owners
app.get("/api/report/closed-by-owners", verifyJWT, async (req, res) => {
  try {
    let matchData = { status: "Completed" };

    if (req.user.role !== "admin") {
      const userTeams = await Team.find({
        members: req.user.userId,
      }).select("_id");

      const teamIds = userTeams.map((t) => t._id);

      matchData.$or = [{ owners: req.user.userId }, { team: { $in: teamIds } }];
    }

    const result = await Task.aggregate([
      { $match: matchData },
      { $unwind: "$owners" },
      {
        $group: {
          _id: "$owners",
          totalClosed: { $sum: 1 },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//total task closed by projects
app.get("/api/report/closed-by-project", verifyJWT, async (req, res) => {
  try {
    let matchData = { status: "Completed" };

    if (req.user.role !== "admin") {
      const userTeams = await Team.find({
        members: req.user.userId,
      }).select("_id");

      const teamIds = userTeams.map((t) => t._id);

      matchData.$or = [{ owners: req.user.userId }, { team: { $in: teamIds } }];
    }

    const result = await Task.aggregate([
      { $match: matchData },
      {
        $group: {
          _id: "$projectId",
          totalClosed: { $sum: 1 },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("running on port:", PORT);
});
