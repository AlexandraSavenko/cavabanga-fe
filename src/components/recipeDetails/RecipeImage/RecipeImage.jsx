import css from "./RecipeImage.module.css";
export default function RecipeImage({ src, alt }) {
  return (
    <div className={css.recipeImageContainer}>
      <img className={css.recipeImage} src={src} alt={alt} />
    </div>
  );
}
