import { Link } from "react-router-dom";

export function Header({ setLoggedIn }) {
  function handleClick() {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
  }
  return (
    <>
      <h1>Project Management</h1>
      {localStorage.getItem("loggedIn") === "true" ? (
        <Link onClick={handleClick} to={"/"}>
          Logout
        </Link>
      ) : (
        ""
      )}
    </>
  );
}
