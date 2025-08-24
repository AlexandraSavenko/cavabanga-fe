import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";
import React from 'react';

const Logo = () => {
  return (
    <NavLink className={css.wrap} to={"/"}>
      <svg className={css.icon}>
          <use
            href={`./icons.svg#icon-cook-book`}
          ></use>
        </svg>
        <span className={css.text}>tasteorama</span>
    </NavLink>
  )
}

export default Logo
