import { useLocation } from "react-router-dom";
import css from "./SaveButton.module.css";
import clsx from "clsx";

export default function SaveButton({ onClick, isFavorite }) {
  const location = useLocation().pathname;
  const isOnMain = !location.includes("recipe");


  return (
    <button
      className={clsx(isOnMain ? css.miniBtn : css.saveButton, isFavorite && css.activeMin )}
      onClick={onClick}
    >
      {isOnMain ? "" : isFavorite ? "Unsave" : "Save"}
      <svg
        className={ clsx( isOnMain && isFavorite ? css.activeMin : isFavorite ? css.active : "", isOnMain ? css.miniIcon : css.icon )}
        width="24"
        height="24"
      >
        <use href="/icons.svg#icon-flag" />
      </svg>
    </button>
  );
}
