import { useState } from "react";
import "../styles/createProject.css";

export function CreateProject() {
  const [name, setName] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [budget, setBudget] = useState("");
  const [workload, setWorkload] = useState("");
  const [completionTime, setCompletionTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., send data to backend
    const url = "/api/projects";
    const data = {
      name,
      teamSize,
      budget,
      workload,
      completionTime,
    };
    console.log(data);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error creating project");
      }

      window.location.href = `/projects`;

      const responseData = await response.json();
      console.log(responseData);
      return responseData; // Assuming your server responds with some data upon successful login
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
    console.log("Submitted:", projectData);

    // Clear form fields after submission
    setName("");
    setTeamSize("");
    setBudget("");
    setWorkload("");
    setEstimatedCompletionTime("");
  };

  return (
    <div className="createProject">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Team Size:
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
          />
        </label>
        <br />
        <label>
          Budget:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </label>
        <br />
        <label>
          Workload:
          <input
            type="text"
            value={workload}
            onChange={(e) => setWorkload(e.target.value)}
          />
        </label>
        <br />
        <label>
          Estimated Completion Time:
          <input
            type="text"
            value={completionTime}
            onChange={(e) => setCompletionTime(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}
