import css from "./SaveButton.module.css";

export default function SaveButton({ onClick, isFavorite }) {
  return (
    <button className={css.saveButton} onClick={onClick}>
      {isFavorite ? "Remove from Favorites" : "Save"}
    </button>
  );
}
