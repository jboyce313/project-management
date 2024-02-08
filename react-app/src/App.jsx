import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { ProjectList } from "./components/ProjectList";
import { Project } from "./components/Project";

function App() {
  let [user, setUser] = useState([]);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h1>Project Management</h1>

      <Routes>
        <Route
          path="/"
          element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:projectID" element={<Project />} />
      </Routes>
    </>
  );
}

export default App;
