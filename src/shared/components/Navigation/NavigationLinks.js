import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavigationLinks.css";

const NavigationLinks = (props) => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to={"/"} exact>
          All Users
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={"/u1/places"}>My Places</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={"/places/new"}>Add Place</NavLink>
        </li>
      )}
      <li>
        <NavLink to={"/auth"}>Authenticate</NavLink>
      </li>
      {auth.isLoggedIn && 
      <button onClick={auth.logout}>LOGOUT</button>
      }
    </ul>
  );
};

export default NavigationLinks;
