import React from "react";
import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      {}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg className={styles.icon}>
          <use href="/icon.svg#icon-go-back-arrow"></use>
        </svg>
      </button>

      {}
      {pages.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${
            currentPage === page ? styles.active : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg className={styles.icon}>
          <use href="/icons.svg#icon-go-back-arrow"></use>
        </svg>
      </button>
    </div>
  );
}
