import css from "./RecipeTitle.module.css";

export default function RecipeTitle({ title }) {
  return <h1 className={css.recipeTitle}>{title}</h1>;
}
