import css from "./OwnPagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectOwnPage, selectTotalOwnPages } from "../../redux/recipes/selectors";
import { setOwnPage } from "../../redux/recipes/slice";

export default function OwnPagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector(selectOwnPage);
  const totalPages = useSelector(selectTotalOwnPages);

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
        onClick={() => dispatch(setOwnPage(currentPage - 1))}
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
          onClick={() => dispatch(setOwnPage(page))}
        >
          {page}
        </button>
      ))}

      <button
        className={css.arrow}
        onClick={() => dispatch(setOwnPage(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <svg className={css.icon}>
          <use href="/icons.svg#icon-pagination-forwards"></use>
        </svg>
      </button>
    </div>
  );
}

