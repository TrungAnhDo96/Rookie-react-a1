import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function NavBar() {
  const routes = [
    { path: "/", name: "Home" },
    { path: "posts", name: "Posts" },
    { path: "profile", name: "Profile" },
    { path: "login", name: "Login" },
  ];

  return (
    <div>
      {routes.map((route) => {
        return (
          <div key={route.name} className="routeLink">
            <Link to={route.path}>{route.name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default NavBar;
