import css from "./GeneralInfo.module.css";

export default function GeneralInfo({ category, cookingTime, cals }) {
  return (
    <div className={css.generalInfo}>
      <h2 className={css.generalInfoTitle}>General information</h2>
      <ul className={css.recipeDetails}>
        <li className={css.recipeDetailItem}>
          Category: <span className={css.recipeDetailValue}>{category}</span>
        </li>
        <li className={css.recipeDetailItem}>
          Cooking Time:{" "}
          <span className={css.recipeDetailValue}>{cookingTime} minutes</span>
        </li>
        <li className={css.recipeDetailItem}>
          Calories:{" "}
          <span className={css.recipeDetailValue}>
            {cals ? `${cals} kcal` : "N/A"}
          </span>
        </li>
      </ul>
    </div>
  );
}
