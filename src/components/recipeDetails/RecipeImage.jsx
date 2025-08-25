export default function RecipeImage({ src, alt }) {
  return <img className={css.recipeImage} src={src} alt={alt} />;
}
