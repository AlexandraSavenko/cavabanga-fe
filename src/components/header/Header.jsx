import React from "react";
import css from "./Header.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isLoggedIn = true;
  return (
    <div className={css.wrap}>
      <Logo />
      <nav>
        <NavLink to={"#"}>Recipes</NavLink>
        {isLoggedIn ? (
          <NavLink to={"#"}>My profile</NavLink>
        ) : (
          <NavLink to={"#"}>Log in</NavLink>
        )}
        {isLoggedIn ? (
          <NavLink to={"#"}>Add Recipe</NavLink>
        ) : (
          <NavLink to={"#"}>Register</NavLink>
        )}
      </nav>
      {isLoggedIn && (
        <div className={css.userNav}>
          {" "}
          <div className={css.userInfo}>
            {" "}
            <span className={css.userIcon}>M</span> <p>User</p>
          </div>{" "}
          <div className={css.br}></div>
          <button>
            <svg className={css.icon}>
              <use href={`./icons.svg#icon-log-out`}></use>
            </svg>
          </button>{" "}
        </div>
      )}
    </div>
  );
};

export default Header;
