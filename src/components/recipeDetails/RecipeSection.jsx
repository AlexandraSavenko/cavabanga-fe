import css from "./RecipeSection.module.css";

export default function RecipeSection({ title, children }) {
  return (
    <section className={css.recipeSection}>
      <About recipe={recipe.about} />
      <IngredientsList ingredients={recipe.ingredients} />
      <PreparationSteps instructions={recipe.instructions} />
    </section>
  );
}
