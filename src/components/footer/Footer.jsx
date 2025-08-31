import React, { useState } from "react";
import css from "./Footer.module.css";
import Logo from "../logo/Logo";
import { Link, NavLink } from "react-router-dom";
import ProtectedLink from "../protectedLink/ProtectedLink";
import ModalErrorCommon from "../ModalErrorCommon/ModalErrorCommon";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
  };
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={css.wrap}>
      <div className={`${css.footer} container`}>
        <Logo />
        <p>© 2025 CookingCompanion. All rights reserved.</p>
        <nav className={css.footerNav}>
          <NavLink
            className={({ isActive }) => isActive ? css.active : ""}
            to={"/"}
          >
            Recipes
          </NavLink>
          {/* <NavLink
            className={({ isActive }) => isActive ? css.active : ""}
            to={"/profile/own"}
          >
            Account
          </NavLink> */}
          <ProtectedLink
            to="/profile/own"
            isLoggedIn={isLoggedIn}
            openLoginModal={() => setShowModal(true)}
          >
            Account
          </ProtectedLink>
        </nav>
      </div>
      <ModalErrorCommon isopen={showModal} onClose={handleModalClose}>
        <p className={css.modalText}>
          You need to log in to have access ot your account.
        </p>
        <div className={css.linkWrap}>
          <a
            className={css.login}
            onClick={handleModalClose}
            to={"/auth/login"}
          >
            Log in
          </a>
          <a
            className={css.register}
            onClick={handleModalClose}
            to={"/auth/register"}
          >
            Register
          </a>
        </div>
      </ModalErrorCommon>
    </div>
  );
};

export default Footer;
