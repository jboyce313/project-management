import React, { useState, useEffect } from "react";
import { TaskList } from "./TaskList";

export const Project = ({ match }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projectId = match.params.projectId;
    fetchProject(projectId);
  }, [match.params.projectId]);

  const fetchProject = async (projectId) => {
    try {
      const reponse = await fetch(`/projects/${projectId}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.log("Error getting project", error);
    }
  };
  return (
    <div>
      {project ? (
        <>
          <h1>{project.name}</h1>
          <p>Team Size: {project.teamSize}</p>
          <p>Budget: {project.budget}</p>
          <p>Workload: {project.workload}</p>
          <p>Completion Time: {project.completionTime}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
