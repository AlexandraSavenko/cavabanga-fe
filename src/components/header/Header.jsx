import React, { useState } from "react";
import css from "./Header.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";

const Header = () => {
  const isLoggedIn = false;
  const [mobileNav, setMobileNav] = useState(false);
  const toggleModal = () => {
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
              <button onClick={toggleModal} className={css.closeModal}>
                <svg>
                  <use href="./icons.svg#icon-close"></use>
                </svg>
              </button>
            </div>
          )}
          <div className={css.siteNav}>
            <NavLink to={"#"}>Recipes</NavLink>
            <div className={css.regMenu}>
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
            </div>
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
          onClick={toggleModal}
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
