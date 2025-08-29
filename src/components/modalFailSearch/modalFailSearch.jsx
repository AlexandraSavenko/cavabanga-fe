import React from 'react';
import css from './ModalFailSearch.module.css';

const ModalFailSearch = () => {
    return (
        <div className={css.box}>
            <div className={css.wrapper}>
            <p className={css.text}>We’re sorry! We were not able to find a match.</p>
            <button className={css.btn} onClick={() => {}}>
            Reset serach and filters
            </button>
            </div>
        </div>
    );
}
export default ModalFailSearch;