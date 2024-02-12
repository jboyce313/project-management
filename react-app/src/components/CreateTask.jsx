import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/createTask.css";

export function CreateTask() {
  const { projectID } = useParams();
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedDuration, setEstimatedTime] = useState("");
  const [taskSubmitted, setTaskSubmitted] = useState("false");
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    getProjectName();
  }, []);

  async function getProjectName() {
    try {
      const response = await fetch(`/api/projects/${projectID}`);
      const data = await response.json();
      console.log(data);
      setProjectName(data.name);
      console.log(projectName);
    } catch (error) {
      console.log("Error getting project", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log("Form submitted:", {
      description,
      assignee,
      dueDate,
      estimatedTime,
    });
    // You can add further logic here, such as sending the form data to an API endpoint
    const newTask = postTask();
    console.log(newTask);
    setTaskSubmitted("true");
    window.location.href = `/projects/${projectID}`;
  };

  async function postTask() {
    const url = "/api/tasks";
    const data = {
      projectID: projectID,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      estimatedDuration: estimatedDuration,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error creating task");
      }

      const responseData = await response.json();
      return responseData; // Assuming your server responds with some data upon successful login
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }

  return (
    <>
      <form className="createTaskForm" onSubmit={handleSubmit}>
        <h2>Creating task for {projectName}</h2>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="assignee">Assign To:</label>
          <input
            type="text"
            id="assignee"
            value={assignedTo}
            autoComplete="off"
            onChange={(e) => setAssignee(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="estimatedTime">Estimated Time:</label>
          <input
            type="text"
            id="estimatedTime"
            value={estimatedDuration}
            autoComplete="off"
            onChange={(e) => setEstimatedTime(e.target.value)}
          />
        </div>
        <button type="submit">Create Task</button>
        {/* <p className={taskSubmitted == "true" ? "hidden" : "notHidden"}>
        Task created. You may create another task or return to project screen.
      </p> */}
      </form>
      <div className="cancel">
        <Link to={`/projects/${projectID}`}>Cancel</Link>
      </div>
    </>
  );
}
