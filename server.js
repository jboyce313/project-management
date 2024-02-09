import express from "express";
import { MongoClient, ObjectId } from "mongodb";
const { PythonShell } = require('python-shell');

const app = express();

app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

function connectToDB() {
  client
    .connect()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

// Route to get all projects
app.get("/api/projects", async (req, res) => {
  try {
    connectToDB();
    const db = client.db("project_management");
    const collection = db.collection("projects");
    const projects = await collection.find().toArray();
    client.close();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/api/projects/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    connectToDB();
    const db = client.db("project_management"); // Replace 'your_database' with your database name
    const projectsCollection = db.collection("projects");
    const tasksCollection = db.collection("tasks");
    if (!tasksCollection) console.log("no tasks");

    // Retrieve project
    const project = await projectsCollection.findOne({
      _id: new ObjectId(projectId),
    });

    // If project not found, return 404
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Retrieve tasks for the project
    const tasks = await tasksCollection
      .find({ projectID: projectId })
      .toArray();

    // Add tasks array to the project
    project.tasks = tasks;

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all task
app.get("/api/tasks", async (req, res) => {
  try {
    connectToDB();
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
app.post("/api/tasks", async (req, res) => {
  const { projectID, description, assignedTo, dueDate, estimatedDuration } =
    req.body;
  const task = {
    projectID,
    description,
    assignedTo,
    dueDate,
    estimatedDuration,
  };
  connectToDB();
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
app.post("/api/projects", async (req, res) => {
  const { name, teamSize, budget, workload, completionTime } = req.body;
  const project = {
    teamSize,
    budget,
    workload,
    completionTime,
  };

  connectToDB();
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
app.delete("/api/tasks/:id", async (req, res) => {
  const taskID = req.params.id;

  connectToDB();
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

// Route to delete a project
app.delete("/api/projects/:id", async (req, res) => {
  const projectID = req.params.id;

  connectToDB();
  client
    .db("project_management")
    .collection("projects")
    .deleteOne({ _id: new ObjectId(projectID) })
    .then((result) => {
      if (result.deletedCount === 0) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.json({ message: "Project deleted successfully" });
      }
    })
    .catch((error) => {
      console.error("Error deleteing project", error);
      res.status(500).json({ message: "error" });
    });
});

//Route to update a task
app.put("/api/tasks/:id", async (req, res) => {
  const taskID = req.params.id;
  const updatedTask = req.body;

  connectToDB();
  client
    .db("project_management")
    .collection("tasks")
    .updateOne({ _id: new ObjectId(taskID) }, { $set: updatedTask })
    .then((result) => {
      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Task not found" });
      } else {
        res.json({ message: "Task updated successfully" });
      }
    })
    .catch((error) => {
      console.error("Error updating task", error);
      res.status(500).json({ message: "error" });
    });
});

//Route to update a project
app.put("/api/projects/:id", async (req, res) => {
  const projectID = req.params.id;
  const updatedProject = req.body;

  connectToDB();
  client
    .db("project_management")
    .collection("projects")
    .updateOne({ _id: new ObjectId(projectID) }, { $set: updatedProject })
    .then((result) => {
      if (result.matchedCount === 0) {
        res.status(404).json({ message: "Project not found" });
      } else {
        res.json({ message: "Project updated successfully" });
      }
    })
    .catch((error) => {
      console.error("Error updating Project", error);
      res.status(500).json({ message: "error" });
    });
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    connectToDB();
    // Access the project_management database
    const database = client.db("project_management");

    // Access the users collection
    const collection = database.collection("users");

    // Find the user in the collection
    const user = await collection.findOne({ username });

    if (!user) {
      client.close();
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    if (user.password !== password) {
      client.close();
      return res.status(401).json({ message: "Incorrect password" });
    }

    // If both checks pass, return success message or token
    client.close();
    // Set the loggedIn variable to true

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/predict', (req, res) => {
  const { team_size, budget, workload } = req.body;

  const options = {
    scriptPath: 'C:\Users\wasadmin\Documents\capstone\project-management\model_training.py', 
    args: [team_size, budget, workload] 
  };

  // Execute the Python script
  PythonShell.run('model_training.py', options, (err, results) => {
    if (err) {
      console.error('Error executing Python script:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      const predicted_completion_time = results[0];
      res.json({ predicted_completion_time });
    }
  });
});


const port = 3500;
app.listen(port, () => console.log(`Listening on port ${port}.`));
