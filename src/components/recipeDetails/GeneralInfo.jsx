import css from "./GeneralInfo.module.css";

export default function GeneralInfo({ category, cookingTime, calories }) {
  return (
    <div className={css.generalInfo}>
      <h2 className={css.recipeTitle}>{recipe.title}</h2>
      <ul className={css.recipeDetails}>
        <li className={css.recipeDetailItem}>Category: {category}</li>
        <li className={css.recipeDetailItem}>
          Cooking Time: {cookingTime} minutes
        </li>
        <li className={css.recipeDetailItem}>Calories: {calories} kcal</li>
      </ul>
    </div>
  );
}
