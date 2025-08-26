
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import css from "./AddRecipePage.module.css"; 

const AddRecipePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Add Recipe</h1>

      <section className={css.section}>
        <p className={css.subtitle}>General Information</p>
      </section>

      <section className={css.section}>
        <p className={css.subtitle}>Ingredients</p>
      </section>

      <section className={css.section}>
        <p className={css.subtitle}>Instructions</p>
      </section>

      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;


