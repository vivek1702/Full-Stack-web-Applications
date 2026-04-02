require("dotenv").config();
const { initalizeDb } = require("./DB/db.connect");
const Lead = require("./models/Lead.model");
const SalesAgent = require("./models/SalesAgent.model");
const Comment = require("./models/Comment.model");
const Tag = require("./models/Tags.model");
const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();

//cors data validation comes from from end
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

//using express to do api calls
app.use(express.json());

//initialize db connection
initalizeDb();

//insert the leads through api calls
app.post("/api/leads", async (req, res) => {
  try {
    const newData = req.body;
    //checking if sales agent exists
    const agent = await SalesAgent.findById(newData.salesAgent);
    //console.log(agent);
    if (!agent) {
      return res.status(404).json({
        error: "Sales agent not found",
      });
    }
    //create mongoose documment
    const savedLead = await new Lead(newData).save();
    return res
      .status(201)
      .json({ message: "success-201 created", data: savedLead });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all the leads data
app.get("/api/leads", async (req, res) => {
  try {
    const { source, salesAgent, status, tags } = req.query;
    const filter = {}; //inital empty filter for search

    if (salesAgent) {
      if (!mongoose.Types.ObjectId.isValid(salesAgent)) {
        return res.status(400).json({
          error: "Invalid input: 'salesAgent' must be a valid ObjectId.",
        });
      }
      filter.salesAgent = salesAgent;
    }

    //validate status
    const allowedStatus = Lead.schema.path("status").enumValues;
    if (status) {
      //if status found then, it adds as filter = {status: "New"}
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          error: `invalid input: 'status' must be one of ${JSON.stringify(allowedStatus.join(", "))}`,
        });
      }
      filter.status = status;
    }

    if (tags) {
      //if tag found then, it adds as filter = {status: "New", tag: "follow-up"}
      filter.tags = tags;
    }

    const allowedSource = Lead.schema.path("source").enumValues;
    if (source) {
      if (!allowedSource.includes(source)) {
        return res.status(400).json({
          error: `invalid input: 'source' must be one of ${JSON.stringify(allowedSource)}`,
        });
      }
      filter.source = source;
    }
    const LeadsData = await Lead.find(filter); // if filter is empty then it gives all the data
    res.status(200).json(LeadsData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update leads data by id
app.put("/api/leads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    //check if given lead id is valid and id is in leads
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'lead Id' must be a valid ObjectId." });
    }
    const leadId = await Lead.findById(id);
    if (!leadId) {
      return res
        .status(404)
        .json({ error: `Invalid input: 'lead Id' ${leadId} not found.` });
    }

    //check if given data is correct for status and source
    const allowedStatus = Lead.schema.path("status").enumValues;
    if (updateData.status && !allowedStatus.includes(updateData.status)) {
      return res.status(400).json({
        error: `invalid input: 'status' must be one of ${JSON.stringify(allowedStatus.join(", "))}`,
      });
    }

    const allowedSource = Lead.schema.path("source").enumValues;
    if (updateData.source && !allowedSource.includes(updateData.source)) {
      return res.status(400).json({
        error: `invalid input: 'source' must be one of ${JSON.stringify(allowedSource.join(", "))}`,
      });
    }

    const updateLead = await Lead.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    //show updated data
    res.status(200).json(updateLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//delete leads by id
app.delete("/api/leads/:id", async (req, res) => {
  const { id } = req.params;

  try {
    //check if given lead id is valid and id is in leads
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'lead Id' must be a valid ObjectId." });
    }
    const leadId = await Lead.findById(id);
    if (!leadId) {
      return res
        .status(404)
        .json({ error: `Invalid input: 'lead Id' ${leadId} not found.` });
    }

    await Lead.findByIdAndDelete(id);
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "invalid request" });
  }
});

//desing api for sales agents add and read
app.post("/api/agents", async (req, res) => {
  try {
    const { name, email } = req.body;
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const existingEmail = await SalesAgent.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        error: "email already exists",
      });
    }

    if (!emailRegx.test(email)) {
      return res.status(400).json({
        error:
          'Invalid email address. Must contain "@" and a dot in the domain part.',
      });
    }

    const savedSalesAgent = await new SalesAgent({ name, email }).save();
    return res
      .status(201)
      .json({ message: "success-201 created", data: savedSalesAgent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/agents", async (req, res) => {
  try {
    const salesAgentData = await SalesAgent.find();
    res.status(200).json(salesAgentData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/agents/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await SalesAgent.findByIdAndDelete(id);
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "invalid request" });
  }
});

//write crud operations for comments model
app.post("/api/leads/:id/comments", async (req, res) => {
  try {
    const leadId = req.params.id;
    const newData = req.body;
    const existinglead = await Lead.findById(leadId);
    const existingAuthorId = await SalesAgent.findById(newData.author);
    if (!existinglead) {
      return res.status(404).json({ error: `leads with ${leadId} not found` });
    }

    if (!existingAuthorId) {
      return res
        .status(404)
        .json({ error: `author with ${newData.author} not found` });
    }

    //first we will create new comment based on lead id then populate author name in new comment
    const newComment = await Comment.create({
      lead: leadId,
      author: existingAuthorId._id,
      commentText: req.body.commentText,
    });

    const populateComment = await Comment.findById(newComment._id).populate(
      "author",
      "name email",
    );

    res.status(201).json(populateComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/leads/:id/comments", async (req, res) => {
  try {
    const leadId = req.params.id;
    const existinglead = await Lead.findById(leadId);
    if (!existinglead) {
      return res.status(404).json({ error: `leads with ${leadId} not found` });
    }

    const comments = await Comment.find({ lead: leadId }).populate(
      "author",
      "name email",
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//reports api calls
app.get("/api/report/last-week", async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    //filter leads that where closed in last seven days
    // closedAt: { $gte: sevenDaysAgo },
    const recentleads = await Lead.find({
      closedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    }).sort({ closedAt: -1 });

    res.status(200).json(recentleads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/report/pipeline", async (req, res) => {
  try {
    const leadsInPipeline = await Lead.find({
      status: { $ne: "Closed" },
    });
    res.status(200).json({ totalLeadsInPipeline: leadsInPipeline.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/report/closed", async (req, res) => {
  try {
    const leadsClosed = await Lead.find({
      status: { $nin: ["New", "Contacted", "Qualified", "Proposal Sent"] },
    });
    res
      .status(200)
      .json({ totalLeadsClosed: leadsClosed.length, totalLeads: leadsClosed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/report/agent-closed-leads", async (req, res) => {
  try {
    const result = await Lead.aggregate([
      { $match: { status: "Closed" } },
      { $group: { _id: "$salesAgent", closedLeads: { $sum: 1 } } },
      {
        $lookup: {
          from: "sales agents",
          localField: "_id",
          foreignField: "_id",
          as: "agent",
        },
      },
      { $unwind: "$agent" },
      {
        $project: {
          _id: 0,
          agentName: "$agent.name",
          closedLeads: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/report/leadsStatus-distrubition", async (req, res) => {
  try {
    const result = await Lead.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", count: 1 } },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//tag api calls
app.post("/api/tags", async (req, res) => {
  try {
    const newTag = req.body;

    const savedTag = await new Tag(newTag).save();

    res.status(201).json({
      message: "Tag created successfully",
      data: savedTag,
    });
  } catch (error) {
    // Handle duplicate tag (unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        error: "Tag already exists",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
});

app.get("/api/tags", async (req, res) => {
  try {
    const tags = await Tag.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: tags.length,
      data: tags,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//app running port
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log("app is running on port", PORT);
  });
}
module.exports = app;
