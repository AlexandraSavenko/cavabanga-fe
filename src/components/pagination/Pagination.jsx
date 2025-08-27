import React from "react";
import css from "./Pagination.module.css"
import { useSelector } from "react-redux";
import { selectPage, selectTotalPages } from "../../redux/recipes/selectors";

export default function Pagination({ onPageChange }) {
  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={css.pagination}>
      {}
      <button
        className={css.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg className={css.icon}>
          <use href="/icon.svg#icon-go-back-arrow"></use>
        </svg>
      </button>

      {}
      {pages.map((page) => (
        <button
          key={page}
          className={`${css.page} ${
            currentPage === page ? css.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {}
      <button
        className={css.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg className={css.icon}>
          <use href="/icons.svg#icon-go-back-arrow"></use>
        </svg>
      </button>
    </div>
  );
}
