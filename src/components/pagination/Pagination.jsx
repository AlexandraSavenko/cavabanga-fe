import React from "react";
import css from "./Pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, selectTotalPages } from "../../redux/recipes/selectors";
import { setPage } from "../../redux/recipes/slice";

export default function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // універсальна функція скролу вгору
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    scrollToTop();
  };

  return (
    <div className={css.pagination}>
      {/* попередня сторінка */}
      <button
        className={css.arrow}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg className={css.icon}>
          <use href="/icons.svg#icon-go-back-arrow"></use>
        </svg>
      </button>

      {/* номери сторінок */}
      {pages.map((page) => (
        <button
          key={page}
          className={`${css.page} ${currentPage === page ? css.active : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* наступна сторінка */}
      <button
        className={css.arrow}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg className={css.icon}>
          <use href="/icons.svg#icon-go-forward-arrow"></use>
        </svg>
      </button>
    </div>
  );
}
