import React, { useState } from "react";
import { login } from "../scripts/Login";

export function Login({ setUser, setLoggedIn, setIsManager, isManager }) {
  // State variables to hold the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  console.log(localStorage.getItem("loggedIn"));

  // Function to handle changes in the username input
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to handle changes in the password input
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can perform validation, authentication, etc.
    console.log("Username:", username);
    console.log("Password:", password);
    const user = await login(username, password);
    console.log(user);
    if (user) {
      setUser(user.username);
      localStorage.setItem("loggedIn", "true");
      setLoggedIn(true);
      if (user.manager == true) setIsManager(true);
      console.log("logged in: " + localStorage.getItem("loggedIn"));
    } else {
      alert("Invalid Login");
    }

    // Reset the form fields after submission
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
