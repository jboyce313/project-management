import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";

function App() {
  return (
    <>
      <h1>Project Management</h1>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
