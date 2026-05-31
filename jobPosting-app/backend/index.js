require("dotenv").config({ path: "./backend/.env" });
const { initialzeDb } = require("./db/db.connect");
const Jobs = require("./models/Jobs.models");
const JobsUsers = require("./models/users.models");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

//db initialize
initialzeDb();

//sign-up
app.post("/api/auth/sign-up", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //if filled data in form is missing while sigining-up
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "missing information" });
    }

    //checking if user exist or not
    const existingUser = await JobsUsers.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "user exists already" });
    }

    //hashing password
    const hashingPassword = await bcrypt.hash(password, 10);

    //insert data
    const payLoad = { name, email, password: hashingPassword, role };
    const response = new JobsUsers(payLoad);
    const result = await response.save();

    //message response
    res.status(200).json({
      message: "User added",
      data: { name: result.name, email: result.email, role: result.role },
    });
  } catch (error) {
    return res.status(400).json({ error: "invalid request" });
  }
});

//login call
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  //basic validation checks of correct inputs
  if (!email || !password) {
    return res.status(400).json({
      type: "VALIDATION_ERROR",
      message: "Email and password required",
    });
  }

  try {
    //find user
    const existingUser = await JobsUsers.findOne({ email });
    //if user not found
    if (!existingUser) {
      return res.status(404).json({
        type: "USER_NOT_FOUND",
        message: "user doesnot exist",
      });
    }

    //match user password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    //if password not matched
    if (!isMatch) {
      return res.status(401).json({
        type: "Invalid Password",
        message: "incorrect password",
      });
    }

    //generate token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        role: existingUser.role,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    //success response
    res.status(200).json({
      type: "SUCCESS",
      message: "Access granted",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      type: "SERVER_ERROR",
      message: "Something went wrong",
    });
  }
});

//middle-ware to verify user
const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  //const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    const deToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = deToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token provided" });
  }
};

//after login
app.get("/api/auth/me", verifyJWT, async (req, res) => {
  res.json({
    message: "Protected route accessible",
    user: req.user,
  });
});

//dashboard to see jobs created by employer and user's
app.get("/api/auth/jobListing", verifyJWT, async (req, res) => {
  try {
    //get search query
    const { search } = req.query;

    //initalize filter for filter data
    let filter = {};
    if (req.user.role === "employer") {
      filter.createdBy = req.user.userId;
    }

    // if search title search happens
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    //query into db
    const result = await Jobs.find(filter);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

//get job by id
//dashboard to see jobs created by employer and user's
app.get("/api/auth/jobListing/:id", verifyJWT, async (req, res) => {
  try {
    //get search query
    const jobId = req.params.id;

    //query into db
    const result = await Jobs.findById(jobId);

    //if not result found
    if (!result) {
      return res.status(404).json({ message: "Job Posting not found" });
    }
    res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
  }
});

//creating jobs api call
app.post("/api/auth/jobListing", verifyJWT, async (req, res) => {
  try {
    // only employers can create jobs
    if (req.user.role !== "employer") {
      return res.status(403).json({
        success: false,
        message: "Only employers can create jobs",
      });
    }

    const {
      title,
      companyName,
      location,
      salary,
      type,
      description,
      qualifications,
    } = req.body;

    const newJob = new Jobs({
      title,

      details: {
        CompanyName: companyName,
        location,
        salary,
        type,
      },

      description,
      qualifications,

      createdBy: req.user.userId,
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: savedJob,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to create job",
    });
  }
});

// Delete Job by ID
app.delete("/api/auth/jobListing/:id", verifyJWT, async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Jobs.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Only the employer who created the job can delete it
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Jobs.findByIdAndDelete(jobId);

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete job",
    });
  }
});

//app running port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("app is running on port", PORT);
});

module.exports = app;
