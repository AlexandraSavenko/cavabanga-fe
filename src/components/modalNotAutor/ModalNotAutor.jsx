import React from "react";
import css from "./ModalNotAutor.module.css";
import { Link } from "react-router-dom";

const ModalNotAutor = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.wrap}>
        <button className={css.button}>
          <svg className={css.icon}>
                              <use href={`./icons.svg#icon-close`}></use>
                            </svg>
        </button>
        <p className={css.title}>Error while saving</p>
        <p className={css.text}>
          To save this recipe, you need to authorize first
        </p>
        <div className={css.linkWrap}>
          <Link className={css.login} to={"/auth/login"}>
            Log in
          </Link>
          <Link className={css.register} to={"/auth/register"}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalNotAutor;
