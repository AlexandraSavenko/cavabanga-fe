import React from "react";
import css from "./Footer.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className={css.wrap}>
      <div className={`${css.footer} container`}>
      <Logo />
      <p>© 2025 CookingCompanion. All rights reserved.</p>
      <nav>
        <NavLink className={({isActive}) => isActive && css.active} to={"#"}>Recipes</NavLink>
        <NavLink className={({isActive}) => isActive && css.active} to={"#"}>Account</NavLink>
      </nav>

</div>
    </div>
  );
};

export default Footer;
