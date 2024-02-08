import { Link } from "react-router-dom";

export function Header({ setLoggedIn, setUser, user }) {
  function handleClick() {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);
    setUser("");
  }
  return (
    <>
      <h1>Project Management</h1>
      {localStorage.getItem("loggedIn") === "true" ? (
        <>
          <p>Logged in as {user}</p>
          <Link onClick={handleClick} to={"/"}>
            Logout
          </Link>
        </>
      ) : (
        ""
      )}
    </>
  );
}
