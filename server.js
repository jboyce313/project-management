import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();

app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Route to get all projects
app.get("/", async (req, res) => {
  try {
    const db = client.db("project_management");
    const collection = db.collection("projects");
    const projects = await collection.find().toArray();
    client.close();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Route to get a task
app.get("/tasks", async (req, res) => {
  try {
    const db = client.db("project_management");
    const collection = db.collection("tasks");
    const tasks = await collection.find().toArray();
    client.close();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Route to create a new task
app.post("/tasks", async (req, res) => {
  const { projectID, description, assignedTo, dueDate, estimatedDuration } =
    req.body;
  const task = {
    projectID,
    description,
    assignedTo,
    dueDate,
    estimatedDuration,
  };

  client
    .db("project_management")
    .collection("tasks")
    .insertOne(task)
    .then((result) => {
      res
        .status(201)
        .json({ message: "Your task has been created successfully" });
    })
    .catch((error) => {
      console.error("Error creating task", error);
      res.status(500).json({ message: "error" });
    });
});

// Route to add a new project
app.post("/projects", async (req, res) => {
  const { teamSize, budget, workload, completionTime } = req.body;
  const project = {
    teamSize,
    budget,
    workload,
    completionTime,
  };

  client
    .db("project_management")
    .collection("projects")
    .insertOne(project)
    .then((result) => {
      res
        .status(201)
        .json({ message: "Your project has been created successfully" });
    })
    .catch((error) => {
      console.error("Error creating task", error);
      res.status(500).json({ message: "error" });
    });
});

// Route to delete a task
app.delete("/tasks/:id", async (req, res) => {
  const taskID = req.params.id;

  client
    .db("project_management")
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(taskID) })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.json({ message: "Task deleted successfully" });
      }
    })
    .catch((error) => {
      console.error("Error deleteing task", error);
      res.status(500).json({ message: "error" });
    });
});

const port = 3500;
app.listen(port, () => console.log(`Listening on port ${port}.`));
