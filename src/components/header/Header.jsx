import React, { useState } from "react";
import css from "./Header.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import CommonModal from "../ModalErrorCommon/ModalErrorCommon"

const Header = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [mobileNav, setMobileNav] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const toggleModalNav = () => {
    setMobileNav(!mobileNav);
  };
    const handleLogout = () => {
      setIsConfirmModalOpen(false);
      setMobileNav(false);
      dispatch(logout());
  };
  const confirmLogout = () => {
    setIsConfirmModalOpen(true);
    setMobileNav(false)
  };
  const handleLogoutConfirmClosing = () => {
    setIsConfirmModalOpen(false);
  };
  return (
    <div className={css.wrap}>
      <div className={`${css.header} container`}>
        <Logo />
        <nav
          className={`${css.nav} ${mobileNav ? css.navOpen : css.navClosed}`}
        >
          {mobileNav && (
            <div className={css.modalLogoWrap}>
              <Logo />
              <button onClick={toggleModalNav} className={css.closeModalNav}>
                <svg>
                  <use href="/icons.svg#icon-close"></use>
                </svg>
              </button>
            </div>
          )}
          <div className={css.siteNav}>
            <NavLink
              className={({ isActive }) => (isActive ? css.active : "")}
              onClick={() => setMobileNav(false)}
              to={"/"}
            >
              Recipes
            </NavLink>
            {isLoggedIn ? (
              <NavLink
                className={({ isActive }) => (isActive ? css.active : "")}
                onClick={() => setMobileNav(false)}
                to={"/profile/own "}
              >
                My profile
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive }) => (isActive ? css.active : "")}
                onClick={() => setMobileNav(false)}
                to={"/auth/login"}
              >
                Log in
              </NavLink>
            )}
            {isLoggedIn ? (
              <NavLink
                className={({ isActive }) =>
                  `${isActive && css.active}  ${css.btn}`
                }
                onClick={() => setMobileNav(false)}
                to={"/add-recipe"}
              >
                Add Recipe
              </NavLink>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `${isActive && css.active} ${css.btn}`
                }
                onClick={() => setMobileNav(false)}
                to={"/auth/register"}
              >
                Register
              </NavLink>
            )}
            {isLoggedIn && (
              <div className={css.userNav}>
                {" "}
                <div className={css.userInfo}>
                  {" "}
                  <span className={css.userIcon}>{user.name[0].toUpperCase()}</span> <p>{user.name}</p>
                </div>{" "}
                <div className={css.br}></div>
                <button onClick={confirmLogout}>
                  <svg className={css.icon}>
                    <use href={`/icons.svg#icon-log-out`}></use>
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
            <use href={`/icons.svg#icon-burger-menu`}></use>
          </svg>
        </button>
      </div>
      <CommonModal isopen={isConfirmModalOpen} onClose={handleLogoutConfirmClosing}>
        <p className={css.modalTitle}>Are you shure?</p>
        <p className={css.modalText}>
          We will miss you!
        </p>
        <div className={ css.modalBtnWrapper}>
          <button className={css.modalBtnCancel} type="button" onClick={handleLogoutConfirmClosing}>Cancel</button>
          <button className={css.modalBtnLogout} type="button" onClick={handleLogout}>Log out</button>
        </div>
      </CommonModal>
    </div>
  );
};

export default Header;
