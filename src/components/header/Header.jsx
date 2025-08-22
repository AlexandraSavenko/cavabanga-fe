import React, { useState } from "react";
import css from "./Header.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isLoggedIn = true;
  const [mobileNav, setMobileNav] = useState(false);
  const toggleModalNav = () => {
    setMobileNav(!mobileNav);
  };
  return (
    <div className={css.wrap}>
      <div className={`${css.header} container`}>
        <Logo />
        <nav className={`${css.nav} ${mobileNav ? css.navOpen : css.navClosed}`}>
          {mobileNav && (
            <div className={css.modalLogoWrap}>
              <Logo />
              <button onClick={toggleModalNav} className={css.closeModalNav}>
                <svg>
                  <use href="./icons.svg#icon-close"></use>
                </svg>
              </button>
            </div>
          )}
          <div className={css.siteNav}>
            <NavLink to={"#"}>Recipes</NavLink>
              {isLoggedIn ? (
                <NavLink to={"#"}>My profile</NavLink>
              ) : (
                <NavLink to={"#"}>Log in</NavLink>
              )}
              {isLoggedIn ? (
                <NavLink className={css.btn} to={"#"}>
                  Add Recipe
                </NavLink>
              ) : (
                <NavLink className={css.btn} to={"#"}>
                  Register
                </NavLink>
              )}
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
        </nav>
        <button
          onClick={toggleModalNav}
          className={`${mobileNav ? css.burgerHidden : css.burgerBtn}`}
        >
          <svg className={css.icon}>
            <use href={`./icons.svg#icon-burger-menu`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
