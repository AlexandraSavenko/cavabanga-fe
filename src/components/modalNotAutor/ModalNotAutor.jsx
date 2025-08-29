import React, { useEffect } from "react";
import css from "./ModalNotAutor.module.css";
import { Link } from "react-router-dom";

const ModalNotAutor = ({modalOpen}) => {
  useEffect(() => {
    // disable scroll
    document.body.style.overflow = "hidden";
    return () => {
      // cleanup: re-enable scroll
      document.body.style.overflow = "";
    };
  }, []);
  return ( <>
    <div className={css.backdrop}></div>
      <div className={css.wrap}>
        <button onClick={() => modalOpen(false)} className={css.button}>
          <svg className={css.icon}>
                              <use href={`./icons.svg#icon-close`}></use>
                            </svg>
        </button>
        <p className={css.title}>Error while saving</p>
        <p className={css.text}>
          To save this recipe, you need to authorize first
        </p>
        <div className={css.linkWrap}>
          <Link className={css.login} onClick={() => modalOpen(false)} to={"/auth/login"}>
            Log in
          </Link>
          <Link className={css.register}onClick={() => modalOpen(false)} to={"/auth/register"}>
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default ModalNotAutor;
