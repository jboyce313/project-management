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
        <div className="pageTitle">
          <Link to={"/"} className="logo">
            Project Manager
          </Link>
        </div>
        {/* <p className="made-by">Made by Aaron & Jacob</p> */}
        <div className="nav">
          <Link className={"predictLink"} to={"/predict"}>
            Project Completion Time Predictor
          </Link>
          {localStorage.getItem("loggedIn") == "true" ? (
            <Link onClick={handleClick} to={"/"} className="logout-link">
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
