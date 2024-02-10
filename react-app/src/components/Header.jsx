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
        {/* <p className="made-by">Made by Aaron & Jacob</p> */}
        {/* <div className="nav"> */}
        <div className={"predictLink"}>
          <Link to={"/predict"}>Completion Time Model</Link>
        </div>
        <div className="pageTitle">
          <Link to={"/"} className="logo">
            Project Manager
          </Link>
        </div>
        <div className="logout-link">
          {localStorage.getItem("loggedIn") == "true" ? (
            <Link onClick={handleClick} to={"/"}>
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
