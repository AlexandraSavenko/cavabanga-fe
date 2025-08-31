import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import css from "./AddRecipesPage.module.css"

const AddRecipePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Add Recipe</h1>
<AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;


