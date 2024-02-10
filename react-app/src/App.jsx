import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { ProjectList } from "./components/ProjectList";
import { Project } from "./components/Project";
import { TaskList } from "./components/TaskList";
import { Header } from "./components/Header";
import { CreateTask } from "./components/CreateTask";
import { PredictCompleteTime } from "./components/PredictCompleteTime";
import { CreateProject } from "./components/CreateProject";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let [user, setUser] = useState([]);
  let [isManager, setIsManager] = useState("");
  let [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));

  console.log("logged in: " + localStorage.getItem("loggedIn"));

  return (
    <>
      <Header
        setLoggedIn={setLoggedIn}
        setUser={setUser}
        user={user}
        setIsManager={setIsManager}
        isManager={isManager}
      />

      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("loggedIn") == "true" ? (
              <ProjectList setIsManager={setIsManager} isManager={isManager} />
            ) : (
              <Login
                setUser={setUser}
                setLoggedIn={setLoggedIn}
                setIsManager={setIsManager}
                isManager={isManager}
              />
            )
          }
        />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectID" element={<Project />} />
        <Route path="/tasks/:projectId" element={<TaskList />} />
        <Route
          path="/projects/:projectID/createTask"
          element={<CreateTask />}
        />
        <Route path="/predict" element={<PredictCompleteTime />} />
        <Route path="/createProject" element={<CreateProject />} />
      </Routes>
    </>
  );
}

export default App;
