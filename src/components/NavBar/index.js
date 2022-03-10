import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../App";
import Login from "../Login";
import "./index.css";

function NavBar() {
  const { state } = React.useContext(AuthContext);

  const routes = [
    { path: "/", name: "Home" },
    { path: "posts", name: "Posts" },
    { path: "profile", name: "Profile" },
  ];

  return (
    <div className="Navbar">
      {routes.map((route) => {
        return (
          <div key={route.name} className="routeLink">
            <Link to={route.path}>{route.name}</Link>
          </div>
        );
      })}
      <div key="Login" className="routeLink">
        {state.isAuthenticated === true ? (
          <Login />
        ) : (
          <Link to="login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
