import css from "./Logo.module.css";
import React from 'react';

const Logo = () => {
  return (
    <div className={css.wrap}>
      <svg className={css.icon}>
          <use
            href={`./icons.svg#icon-cook-book`}
          ></use>
        </svg>
        <span className={css.text}>tasteorama</span>
    </div>
  )
}

export default Logo
