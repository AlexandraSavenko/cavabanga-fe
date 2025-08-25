import RecipeTitle from "../components/RecipeTitle";
import RecipeImage from "../components/RecipeImage";
import RecipeSection from "../components/RecipeSection";
import GeneralInfo from "../components/GeneralInfo";
import SaveButton from "../components/SaveButton";
import css from "./RecipeDetails.module.css";

export default function RecipeDetails({ recipe }) {
  return (
    <div className={css.recipeDetails}>
      <RecipeTitle title={recipe.title} />
      <RecipeImage src={recipe.image} alt={recipe.title} />
      <GeneralInfo
        category={recipe.category}
        cookingTime={recipe.cookingTime}
        calories={recipe.calories}
      />
      <RecipeSection>
        <About recipe={recipe.about} />
        <IngredientsList ingredients={recipe.ingredients} />
        <PreparationSteps instructions={recipe.instructions} />
      </RecipeSection>
      <SaveButton onClick={() => console.log("Recipe saved")} />
    </div>
  );
}
