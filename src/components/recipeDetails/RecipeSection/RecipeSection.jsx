import css from "./RecipeSection.module.css";

export default function RecipeSection({ about, ingredients, instructions }) {
  return (
    <section className={css.recipeSection}>
      <div>
        <h2 className={css.sectionTitle}>About recipe</h2>
        <p className={css.sectionText}>{about}</p>
      </div>

      <div>
        <h2 className={css.sectionTitle}>Ingredients</h2>
        <ul>
          {ingredients?.map((ing, i) => (
            <li key={i} className={css.sectionText}>
              {typeof ing === "object" ? ing.name : ing}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className={css.sectionTitle}>Preparation Steps</h2>
        <p className={css.sectionText}>{instructions}</p>
      </div>
    </section>
  );
}
