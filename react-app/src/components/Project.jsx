import { useState, useEffect } from "react";
import { TaskList } from "./TaskList";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/project.css";
import { MdPeople } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { IoIosTime } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";

export const Project = ({ match }) => {
  const [project, setProject] = useState(null);
  const { projectID } = useParams();

  const fetchProject = async (projectID) => {
    try {
      const response = await fetch(`/api/projects/${projectID}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.log("Error getting project", error);
    }
  };

  useEffect(() => {
    fetchProject(projectID);
  }, []);

  return (
    <div>
      {project ? (
        <div className="projectContainer">
          <div className="createTaskDivContainer">
            <div className="createTaskDiv">
              {localStorage.getItem("isManager") == "true" ? (
                <Link
                  to={`/projects/${projectID}/createTask`}
                  className="createTask"
                >
                  Create Task
                </Link>
              ) : null}
            </div>
            <div></div>
          </div>
          <div className="infoAndHeader">
            <div className="headerAndButton">
              <h2>{project.name}</h2>
            </div>
            <div className="projectInfo">
              <div className="darkGray">
                <MdPeople />
                <span className="hide">.</span>

                <p>{project.teamSize}</p>
              </div>
              <div className="lightGray">
                <MdAttachMoney />
                <p>{project.budget}</p>
              </div>
              <div className="darkGray">
                <MdWork />
                <span className="hide">.</span>
                <p>{project.workload}</p>
              </div>
              <div className="lightGray">
                <IoIosTime />
                <span className="hide">.</span>

                <p>{project.completionTime}</p>
              </div>
            </div>
          </div>

          <TaskList tasks={project.tasks} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
