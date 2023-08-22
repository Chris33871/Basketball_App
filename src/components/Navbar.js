import React from "react";
import "./Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar--div">
      <div className="navbar--title">
        <a href="/Home" className="navbar--title">
          Who's Playing?
        </a>
      </div>
      <ul className="navbar--menu">
        <li>
          <a href="/Home">Home</a>
        </li>
        {/* Test area */}

        {/* end of test area */}
        <li>
          <a href="/">Games</a>
        </li>
        <li>
          <a href="/teams">Teams</a>
        </li>

        {props.isAuthenticated ? (
          <li>
            <a href="/login">Logout</a>
          </li>
        ) : (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
