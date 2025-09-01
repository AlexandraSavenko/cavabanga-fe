import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import css from "./AddRecipesPage.module.css"

const AddRecipePage = () => {
  return (
    <div className={css.container}>
      <h2 className={css.title}>Add Recipe</h2>
      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;


