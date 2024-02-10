import { Link } from "react-router-dom";
import "../styles/header.css"; // Import CSS file

export function Header({
  setLoggedIn,
  setUser,
  user,
  setIsManager,
  isManager,
}) {
  function handleClick() {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("isManager", "false");
    setLoggedIn(false);
    setIsManager(false);
    setUser("");
  }

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">Project Manager</h1>
        <p className="made-by">Made by Aaron & Jacob</p>
        {localStorage.getItem("loggedIn") == "true" ? (
          <Link onClick={handleClick} to={"/"} className="logout-link">
            Logout
          </Link>
        ) : null}
        <Link className={"predictLink"} to={"/predict"}>
          Project Completion Time Predictor
        </Link>
      </div>
    </header>
  );
}
