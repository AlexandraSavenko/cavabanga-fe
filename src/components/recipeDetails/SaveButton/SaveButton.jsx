import { useLocation } from "react-router-dom";
import css from "./SaveButton.module.css";

export default function SaveButton({ onClick, isFavorite }) {
  const location = useLocation().pathname
  const isOnMain = !location.includes("recipe")
  return (
    <button className={`${isOnMain ? css.miniBtn : ""} ${css.saveButton}`} onClick={onClick}>
      {isOnMain ? "" : isFavorite ? "Unsave" : "Save"}
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
