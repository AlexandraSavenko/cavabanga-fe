import css from "./SaveButton.module.css";

export default function SaveButton({ onClick, isFavorite }) {
  return (
    <button className={css.saveButton} onClick={onClick}>
      {isFavorite ? "Remove from Favorites" : "Save"}
      <svg
        className={`${css.icon} ${isFavorite ? css.active : ""}`}
        width="24"
        height="24"
      >
        <use href="../../../../public/icons.svg#icon-save-to-fav" />
      </svg>
    </button>
  );
}
