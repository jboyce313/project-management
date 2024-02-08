import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { ProjectList } from "./components/ProjectList";
import { Project } from "./components/Project";
import { TaskList } from "./components/TaskList";

import { Header } from "./components/Header";

function App() {
  let [user, setUser] = useState([]);
  let [isManager, setIsManager] = useState("");
  let [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));

  useEffect(() => console.log("check: " + isManager), [isManager]);

  return (
    <>
      <Header setLoggedIn={setLoggedIn} setUser={setUser} user={user} />

      <Routes>
        <Route
          path="/"
          element={
            <Login
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              setIsManager={setIsManager}
              isManager={isManager}
            />
          }
        />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectID" element={<Project />} />
        <Route path="/tasks/:projectId" element={<TaskList />} />
      </Routes>
    </>
  );
}

export default App;
