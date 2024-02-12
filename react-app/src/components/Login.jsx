import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../scripts/Login";
import "../styles/login.css";

export function Login({ setUser, setLoggedIn, setIsManager, isManager }) {
  // State variables to hold the username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    if (user) {
      setUser(user.username);
      localStorage.setItem("loggedIn", true);
      setLoggedIn(true);
      if (user.manager == true) {
        localStorage.setItem("isManager", true);
        setIsManager(true);
      }
      console.log("logged in: " + localStorage.getItem("loggedIn"));
    } else {
      alert("Invalid Login");
    }

    // Reset the form fields after submission
    setUsername("");
    setPassword("");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="username">
          Username:
        </label>
        <input
          className="username-input"
          type="text"
          id="username"
          value={username}
          autoComplete="off"
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password:
        </label>
        <input
          className="password-input"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button className="submit-button" type="submit">
        Login
      </button>
    </form>
  );
}
