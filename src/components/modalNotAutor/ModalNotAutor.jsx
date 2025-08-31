import React, { useEffect } from 'react';
import css from './ModalNotAutor.module.css';
import { Link } from 'react-router-dom';

const ModalNotAutor = ({ modalOpen }) => {
  useEffect(() => {
    // disable scroll
    document.body.style.overflow = 'hidden';

    // закриття по Escape
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        modalOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      // cleanup: re-enable scroll
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen]);

  // закриття по кліку на бек-дроп
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      modalOpen(false);
    }
  };

  return (
    <>
      <div className={css.backdrop} onClick={handleBackdropClick}></div>
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
          <Link
            className={css.login}
            onClick={() => modalOpen(false)}
            to={'/auth/login'}
          >
            Log in
          </Link>
          <Link
            className={css.register}
            onClick={() => modalOpen(false)}
            to={'/auth/register'}
          >
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default ModalNotAutor;
