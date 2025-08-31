import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./AddRecipeForm.module.css";

import { selectCategories, selectIngredients } from "../../redux/filters/selectors";
import { fetchCategories, fetchIngredients } from "../../redux/filters/operations";
import { addRecipe } from "../../redux/recipes/operations";

const AddRecipeForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const ingredientsList = useSelector(selectIngredients);
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
    currentIngredientId: "",
    currentIngredientAmount: "",
    ingredients: [],
    instruction: "",
    recipeImg: null,
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
          id: Yup.string().required("Select an ingredient"),
          ingredientAmount: Yup.string()
            .max(60)
            .required("Specify the amount")
          .min(2, "Add at least 2 ingredients")
      .max(16)
        })
      )
    
      .required("Add at least 2 ingredients"),
    instruction: Yup.string().required("Enter instructions"),
    recipeImg: Yup.mixed().required("Add a photo of the recipe"),
  });

  const handleSubmit = async (values) => {
    console.log(values)
    dispatch(addRecipe())
  }
  //  try {
  //     const formData = new FormData();
  //     formData.append("name", values.name);
  //     formData.append("decr", values.decr);
  //     formData.append("cookiesTime", values.cookiesTime);
  //     if (values.cals) formData.append("cals", values.cals);
  //     formData.append("category", values.category);
  //     formData.append("instruction", values.instruction);

  //     // правильно називаємо поле для бекенду
  //     formData.append("ingredient", JSON.stringify(values.ingredients));
  //     console.log("Ingredients array:", values.ingredients);
  //     console.log("FormData contents:", [...formData.entries()]);


  //     if (values.recipeImg) {
  //       formData.append("recipeImg", values.recipeImg);
  //     }

  //     console.log("Submitting recipe values:", values);
  //     console.log("Submitting FormData:", [...formData.entries()]);
     


  //     await axios.post("/api/recipes", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     alert("Recipe successfully added!");
  //     window.location.href = "/recipes";
  //   } catch (error) {
  //     console.error("Submit error:", error.response?.data || error.message);
  //     alert(
  //       "Error adding recipe: " + (error.response?.data?.message || error.message)
  //     );
  //   } finally {
  //     setSubmitting(false);
  //   }//
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.addRecipeContainer}>
            {/* Upload photo */}
            <div className={css.photoboxWrapper}>
              <label className={css.label}>Upload Photo</label>
              <div className={css.photobox}>
                <input
                  type="file"
                  onChange={(e) => {
                    setFieldValue("recipeImg", e.currentTarget.files[0]);
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
              <ErrorMessage name="recipeImg" component="div" className={css.error} />
            </div>

            <div className={css.formContent}>
              {/* General Information */}
              <section className={css.section}>
                General Information
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
                        <option key={cat._id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="category" component="div" className={css.error} />
                  </div>
                </div>
              </section>

              {/* Ingredients */}
              <section className={css.section}>
                Ingredients
                <div className={css.blocks}>
                  <div className={css.fieldGroup}>
                    <label className={css.labels}>Name</label>
                    <Field as="select" name="currentIngredientId" className={css.input1}>
                      <option value="">Select ingredient</option>
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
                      <Field
                        name="currentIngredientAmount"
                        placeholder="100g"
                        className={css.input2}
                      />
                    </div>

                    <button
                      className={css.buttonNew}
                      type="button"
                      onClick={() => {
                        if (values.currentIngredientId && values.currentIngredientAmount) {
                          setFieldValue("ingredients", [
                            ...values.ingredients,
                            {
                              id: values.currentIngredientId,
                              ingredientAmount: values.currentIngredientAmount,
                            },
                          ]);
                          setFieldValue("currentIngredientId", "");
                          setFieldValue("currentIngredientAmount", "");
                        }
                      }}
                    >
                      Add new ingredient
                    </button>

                    {/* Table headers for tablet */}
                    <div className={css.tabletOnly}>
                      <div className={css.column1}>Name</div>
                      <div className={css.column2}>Amount</div>
                    </div>

                    {/* Ingredient list */}
                    {values.ingredients.length > 0 && (
                      <div className={css.dropDown}>
                        <div className={css.dropDownColumns}>
                          {/* Table headers for mobile */}
                          <div className={css.mobileOnly}>
                            <div className={css.column1}>Name</div>
                            <div className={css.column2}>Amount</div>
                          </div>

                          {values.ingredients.map((ing, index) => {
                            const ingredientName =
                              ingredientsList.find((i) => i._id === ing.id)?.name || ing.id;
                            return (
                              <div key={index} className={css.column}>
                                <div className={css.columnItem}>{ingredientName}</div>
                                <div className={css.columnItem}>
                                  {ing.ingredientAmount}
                                  <button
                                    className={css.buttonDrop}
                                    type="button"
                                    onClick={() => {
                                      const newIngredients = values.ingredients.filter(
                                        (_, i) => i !== index
                                      );
                                      setFieldValue("ingredients", newIngredients);
                                    }}
                                  >
                                    <svg className={css.icons}>
                                      <use href="/public/icons.svg#icon-trash-can" width="16" height="16" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <ErrorMessage name="ingredients" component="div" className={css.error} />
                </div>
              </section>

              {/* Instructions */}
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
