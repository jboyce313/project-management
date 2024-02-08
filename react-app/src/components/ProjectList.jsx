import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      // console.log(response);
      const data = await response.json();
      // console.log(data);
      setProjects(data);
    } catch (error) {
      console.log("Error fetching projects", error);
    }
  };
  console.log(projects);

  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h2>{project.name}</h2>
            <Link to={`/tasks/${project._id}`}>View Tasks</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
