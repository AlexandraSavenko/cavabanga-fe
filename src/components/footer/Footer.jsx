import React from "react";
import css from "./Footer.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={css.wrap}>
      <Logo />
      <p>© 2025 CookingCompanion. All rights reserved.</p>
      <nav>
        <NavLink to={"#"}>Recipes</NavLink>
        <NavLink to={"#"}>Account</NavLink>
      </nav>
    </div>
  );
};

export default Footer;
