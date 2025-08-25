import React, { useEffect } from "react";
import css from "./ModalErrorCommon.module.css";

export default function ModalErrorCommon ({children}) {
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
        <button className={css.button}>
          <svg className={css.icon}>
            <use href={`./icons.svg#icon-close`}></use>
          </svg>
        </button>
        {children}
      </div>
    </>
  );
};
