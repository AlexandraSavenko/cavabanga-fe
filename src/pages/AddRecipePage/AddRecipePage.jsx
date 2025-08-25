import React from "react";
import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import styles from "./AddRecipePage.module.css"; 

const AddRecipePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Recipe</h1>

      <section className={styles.section}>
        <p className={styles.subtitle}>General Information</p>
      </section>

      <section className={styles.section}>
        <p className={styles.subtitle}>Ingredients</p>
      </section>

      <section className={styles.section}>
        <p className={styles.subtitle}>Instructions</p>
      </section>

      <AddRecipeForm />
    </div>
  );
};

export default AddRecipePage;


