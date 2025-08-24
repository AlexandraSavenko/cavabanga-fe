import React, { useState } from "react";
import css from "./Footer.module.css";
import Logo from "../logo/Logo";
import { NavLink } from "react-router-dom";
import ProtectedLink from "../protectedLink/ProtectedLink";
import ModalNotAutor from "../modalNotAutor/ModalNotAutor";
import { createPortal } from "react-dom";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const user = null;
  return (
    <div className={css.wrap}>
      <div className={`${css.footer} container`}>
        <Logo />
        <p>© 2025 CookingCompanion. All rights reserved.</p>
        <nav>
          <NavLink
            className={({ isActive }) => isActive && css.active}
            to={"#"}
          >
            Recipes
          </NavLink>
          <ProtectedLink
            to="/profile/own"
            isLoggedIn={user !== null}
            openLoginModal={() => setShowModal(true)}
          >
            Account
          </ProtectedLink>
        </nav>
      </div>
      {showModal && createPortal( <ModalNotAutor closeModal={setShowModal}/>, document.body) }
    </div>
  );
};

export default Footer;
