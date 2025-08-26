import css from "./RecipeImage.module.css";
export default function RecipeImage({ src, alt }) {
  return <img className={css.recipeImage} src={src} alt={alt} />;
}
