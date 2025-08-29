import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import css from "./AddRecipeForm.module.css";

import { selectCategories, selectIngredients } from "../../redux/filters/selectors";
import { fetchCategories, fetchIngredients } from "../../redux/filters/operations";

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories)

  const ingredientsList = useSelector(selectIngredients) 

  const [previewImage, setPreviewImage] = useState(null);

  

  
  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
    if (!ingredientsList.length) dispatch(fetchIngredients());
  }, [dispatch, categories.length, ingredientsList.length]);

  const initialValues = {
    name: "",
    decr: "",
    cookiesTime: "",
    cals: "",
    category: "",
    ingredient: "",
    ingredientAmount: "",
    ingredients: [],
    instruction: "",
    recipeImg : null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Enter the name of your recipe"),
    decr: Yup.string().required("Enter a brief description of your recipe"),
    cookiesTime: Yup.number()
      .required("Cooking time in minutes")
      .positive()
      .integer(),
    cals: Yup.number().positive().integer(),
    category: Yup.string().required("Select a category"),
    ingredients: Yup.array()
      .of(
        Yup.object({
          ingredient: Yup.string().required("Select an ingredient"),
          ingredientAmount: Yup.string().required("Specify the amount"),
        })
      )
      .min(1, "Add at least one ingredient"),
    instruction: Yup.string().required("Enter instructions"),
      recipeImg : Yup.mixed().required("Add a photo of the recipe"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "ingredients") {
          formData.append(key, JSON.stringify(values[key]));
        } else if (key === " recipeImg ") {
          formData.append("recipeImg ", values.photo);
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
      alert("Error adding recipe: " + error.message);
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
        <Form className={css.form}>

       <div className={css.addRecipeContainer}>
          <div className={css.photoboxWrapper}>
            <label className={css.label}>Upload Photo</label>
            <div className={css.photobox}>
              <input
                type="file"
                onChange={(e) => {
                  setFieldValue("recipeImg ", e.currentTarget.files[0]);
                  setPreviewImage(URL.createObjectURL(e.currentTarget.files[0]));
                }}
                className={css.inputPhoto}
              />
              {!previewImage && (
                <svg className={css.icon}>
                  <use href="/public/icons.svg#icon-camera" />
                </svg>
              )}
              {previewImage && (
                <img src={previewImage} alt="preview" className={css.imagePreview} />
              )}
            </div>
            <ErrorMessage name="recipeImg " component="div" className={css.error} />
          </div>

         <div className={css.formContent}>
          <section className={css.section}>General Information
            <div className={css.fieldBlock}>
              <label className={css.labels}>Recipe Title</label>
              <Field
                name="name"
                className={css.text}
                placeholder="Enter the name of your recipe"
              />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>

            <div className={css.fieldBlock}>
              <label className={css.labels}>Recipe Description</label>
              <Field
                as="textarea"
                name="decr"
                className={css.textarea}
                placeholder="Enter a brief description of your recipe"
              />
              <ErrorMessage name="decr" component="div" className={css.error} />
            </div>

            <div className={css.fieldBlock}>
              <label className={css.labels}>Cooking time in minutes</label>
              <Field type="number" name="cookiesTime" className={css.input} placeholder="10" />
              <ErrorMessage name="cookiesTime" component="div" className={css.error} />
            </div>

            <div className={css.twoColumns}>
              <div className={css.fieldBlock}>
                <label className={css.labels}>Calories</label>
                <Field type="number" name="cals" className={css.inputs} placeholder="150 cals" />
                <ErrorMessage name="cals" component="div" className={css.error} />
              </div>

              <div className={css.fieldBlock}>
                <label className={css.labels}>Category</label>
                <Field as="select" name="category" className={css.inputs}>
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className={css.error} />
              </div>
            </div>
          </section>

     
          <section className={css.section}>Ingredients
            <div className={css.blocks}>
              <div className={css.fieldGroup}>
                <label className={css.labels}>Name</label>
                <Field as="select" name="ingredient" placeholder="Enter ingredient"className={css.input1}>
                  <option value=""></option>
                  {ingredientsList.map((ing) => (
                    <option key={ing._id} value={ing._id}>
                      {ing.name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className={css.amountbox}>
                <div className={css.fieldGroup}>
                  <label className={css.labels}>Amount</label>
                  <Field name="ingredientAmount" placeholder="100g" className={css.input2} />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (values.ingredient && values.ingredientAmount) {
                      setFieldValue("ingredients", [
                        ...values.ingredients,
                        { ingredient: values.ingredient, ingredientAmount: values.ingredientAmount },
                      ]);
                      setFieldValue("ingredient", "");
                      setFieldValue("ingredientAmount", "");
                      
                    }
                  }}
                  className={css.buttonNew}
                >
                  Add new ingredient
                </button>

                {values.ingredients.length > 0 && (
                  <div className={css.dropdownList}>
                    {values.ingredients.map((ing, index) => {
                      const ingredientName =
                        ingredientsList.find((i) => i._id === ing.ingredient)?.name || ing.ingredient;
                      return (
                        <div key={index} className={css.dropdownItem}>
                          <span>
                            {ingredientName} - {ing.ingredientAmount}г
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const newIngredients = values.ingredients.filter((_, i) => i !== index);
                              setFieldValue("ingredients", newIngredients);
                            }}
                            className={css.buttonNew}
                          >
                            ❌
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <ErrorMessage name="ingredients" component="div" className={css.error} />
            </div>
          </section>

          
          <section className={css.section}>
            <div className={css.fieldBlock}>
              <label className={css.label}>Instructions</label>
              <Field
                as="textarea"
                name="instruction"
                className={css.textareas}
                placeholder="Enter instructions"
              />
              <ErrorMessage name="instruction" component="div" className={css.error} />
            </div>
          </section>

          <button type="submit" disabled={isSubmitting} className={css.button}>
            Publish Recipe
              </button>
              </div>
            </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
