import css from "./SaveButton.module.css";

export default function SaveButton({ onClick }) {
  return (
    <button className={css.saveButton} onClick={onClick}>
      Save
    </button>
  );
}
