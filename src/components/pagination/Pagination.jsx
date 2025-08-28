import React from "react";
import css from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, selectTotalPages } from "../../redux/recipes/selectors";
import { setPage } from "../../redux/recipes/slice";

export default function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  const maxVisiblePages = 6;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className={css.pagination}>
      <button
        className={css.arrow}
        onClick={() => dispatch(setPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <svg className={css.icon}>
          <use href="/icons.svg#icon-pagination-backwards"></use>
        </svg>
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          className={`${css.page} ${currentPage === page ? css.active : ""}`}
          onClick={() => dispatch(setPage(page))}
        >
          {page}
        </button>
      ))}

      <button
        className={css.arrow}
        onClick={() => dispatch(setPage(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <svg className={css.icon}>
          <use href="/icons.svg#icon-pagination-forwards"></use>
        </svg>
      </button>
    </div>
  );
}
