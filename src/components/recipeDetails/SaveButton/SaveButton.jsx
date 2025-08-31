import css from "./SaveButton.module.css";

export default function SaveButton({ onClick, isFavorite }) {
  return (
    <button className={css.saveButton} onClick={onClick}>
      {isFavorite ? "Unsave" : "Save"}
      <svg
        className={`${css.icon} ${isFavorite ? css.active : ""}`}
        width="24"
        height="24"
      >
        <use href="/icons.svg#icon-flag" />
      </svg>
    </button>
  );
}
