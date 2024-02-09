import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/projectList.css";
import { MdPeople } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { IoIosTime } from "react-icons/io";

export const ProjectList = ({ setIsManager, isManager }) => {
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
    <div className="projectListContainer">
      <div className="projectListHeader">
        {/* <h1>Projects</h1> */}
        {localStorage.getItem("isManager") == "true" ? (
          <button className="createProject">Create Project</button>
        ) : (
          ""
        )}
      </div>

      <div className="projectList">
        {projects.map((project, index) => (
          <div
            className="project"
            key={project._id}
            to={`/projects/${project._id}`}
            style={{
              backgroundColor: index % 2 === 0 ? "gray" : "white",
              borderTopLeftRadius: index === 0 ? "8px" : "0",
              borderTopRightRadius: index === 0 ? "8px" : "0",
            }}
          >
            <Link style={{ color: index % 2 === 0 ? "white" : "gray" }}>
              {project.name}
            </Link>
            <div className="projectDetails">
              <div className="detail">
                <MdPeople />
                <p>{project.teamSize}</p>
              </div>
              <div className="detail">
                <MdWork />
                <p>{project.workload}</p>
              </div>
              <div className="detail">
                <IoIosTime />
                <p>{project.completionTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
