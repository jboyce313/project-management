import React, { useState, useEffect } from "react";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.log("Error fetching projects", error);
    }
  };
  return (
    <div>
      <h1>Project List</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h2>{project.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};
