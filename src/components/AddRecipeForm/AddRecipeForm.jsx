import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styles from "./AddRecipeForm.module.css"; 

const AddRecipeForm = () => {
  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios.get("/api/categories").then(res => setCategories(res.data));
    axios.get("/api/ingredients").then(res => setIngredientsList(res.data));
  }, []);

  const initialValues = {
    title: "",
    shortDescription: "",
    cookingTime: "",
    calories: "",
    category: "",
    ingredient: "",
    quantity: "",
    ingredients: [],
    instructions: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Name is required"),
    shortDescription: Yup.string().required("A short description is required."),
    cookingTime: Yup.number().required("Specify the cooking time").positive().integer(),
    calories: Yup.number().positive().integer(),
    category: Yup.string().required("Select a category"),
    ingredients: Yup.array()
      .of(
        Yup.object({
          ingredient: Yup.string().required("Select an ingredient"),
          quantity: Yup.string().required("Specify the quantity"),
        })
      )
      .min(1, "Add at least one ingredient"),
    instructions: Yup.string().required("Instructions are required"),
    photo: Yup.mixed().required("Add a photo of the recipe"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === "ingredients") {
          formData.append(key, JSON.stringify(values[key]));
        } else if (key === "photo") {
          formData.append("photo", values.photo);
        } else {
          formData.append(key, values[key]);
        }
      });

      await axios.post("/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Recipe successfully added!");
      window.location.href = "/recipes";
    } catch (error) {
      alert("Error adding recipe:" + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>

          {/* Додати фото */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Upload Photo</label>
            <input
              type="file"
              onChange={(e) => {
                setFieldValue("photo", e.currentTarget.files[0]);
                setPreviewImage(URL.createObjectURL(e.currentTarget.files[0]));
              }}
              className={styles.input}
            />
            {previewImage && <img src={previewImage} alt="preview" className={styles.imagePreview} />}
            <ErrorMessage name="photo" component="div" className={styles.error}/>
          </div>

          {/* Назва рецепту */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Recipe Title</label>
            <Field name="title" className={styles.input}/>
            <ErrorMessage name="title" component="div" className={styles.error}/>
          </div>

          {/* Опис рецепту */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Recipe Description</label>
            <Field as="textarea" name="shortDescription" className={styles.textarea}/>
            <ErrorMessage name="shortDescription" component="div" className={styles.error}/>
          </div>

          {/* Час приготування */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Cooking time in minutes(min)</label>
            <Field type="number" name="cookingTime" className={styles.input}/>
            <ErrorMessage name="cookingTime" component="div" className={styles.error}/>
          </div>

          {/* Калорії */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Calories</label>
            <Field type="number" name="calories" className={styles.input}/>
            <ErrorMessage name="calories" component="div" className={styles.error}/>
          </div>

          {/* Категорія */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Category</label>
            <Field as="select" name="category" className={styles.input}>
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className={styles.error}/>
          </div>

          {/* Інгредієнти */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Ingredients</label>
            <Field as="select" name="ingredient" className={styles.input}>
              <option value="">Name</option>
              {ingredientsList.map(ing => (
                <option key={ing._id} value={ing._id}>{ing.name}</option>
              ))}
            </Field>
            <Field name="quantity" placeholder="Amount" className={styles.input}/>
            <button
              type="button"
              onClick={() => {
                if(values.ingredient && values.quantity){
                  setFieldValue("ingredients", [...values.ingredients, { ingredient: values.ingredient, quantity: values.quantity }]);
                  setFieldValue("ingredient", "");
                  setFieldValue("quantity", "");
                }
              }}
              className={styles.button}
            >
              Add new ingredient
              </button>

            {/* Список доданих інгредієнтів */}
            <FieldArray name="ingredients">
              {() =>
                values.ingredients.map((ing, index) => (
                  <div key={index} className={styles.ingredientItem}>
                    <span>{ingredientsList.find(i => i._id === ing.ingredient)?.name} - {ing.quantity}г</span>
                    <button type="button" onClick={() => {
                      const newIngredients = values.ingredients.filter((_, i) => i !== index);
                      setFieldValue("ingredients", newIngredients);
                    }} className={styles.deleteButton}>Delete</button>
                  </div>
                ))
              }
            </FieldArray>
            <ErrorMessage name="ingredients" component="div" className={styles.error}/>
          </div>

          {/* Інструкції */}
          <div className={styles.fieldBlock}>
            <label className={styles.label}>Instruction</label>
            <Field as="textarea" name="instructions" className={styles.textarea}/>
            <ErrorMessage name="instructions" component="div" className={styles.error}/>
          </div>

          {/* Кнопка опублікувати */}
          <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
            Publish Recipe
          </button>

        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
