import { Link } from "react-router-dom";
import "../styles/header.css"; // Import CSS file

export function Header({ setLoggedIn }) {
  function handleClick() {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
  }

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Project Management</h1>
        <p className="made-by">Made by Aaron & Jacob</p>
        {localStorage.getItem("loggedIn") === "true" ? (
          <Link onClick={handleClick} to={"/"} className="logout-link">
            Logout
          </Link>
        ) : null}
      </div>
    </header>
  );
}
