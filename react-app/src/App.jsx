import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { ProjectList } from "./components/ProjectList";
import { Project } from "./components/Project";
import { TaskList } from "./components/TaskList";

import { Header } from "./components/Header";

function App() {
  let [user, setUser] = useState([]);
  let [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"));

  return (
    <>
      <Header setLoggedIn={setLoggedIn} />

      <Routes>
        <Route
          path="/"
          element={<Login setUser={setUser} setLoggedIn={setLoggedIn} />}
        />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectID" element={<Project />} />
        <Route path="/tasks/:projectId" element={<TaskList />} />
      </Routes>
    </>
  );
}

export default App;
