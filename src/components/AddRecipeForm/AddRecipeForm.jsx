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
    ingredient: [],
    instruction: "",
    recipeImg: null,
  };
 const ingredObjectSchema = Yup.object().shape({
  id: Yup.string().required("Select an ingredient"),
  ingredientAmount: Yup.string()
    .min(1, "Amount must be at least 1 character")
    .max(16, "Amount should not exceed 16 characters")
    .required("Specify the amount"),
});

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(64, "Title should not exceed 64 characters.")
    .required("Enter the title of your recipe"),
    
  decr: Yup.string()
    .max(200, "Description should not exceed 200 characters.")
    .required("Enter a brief description of your recipe"),
    
  cookiesTime: Yup.number()
    .min(1, "Must be at least 1 minute")
    .max(360, "Cannot exceed 360 minutes")
    .positive()
    .integer()
    .required("Time in minutes is required"),
    
  cals: Yup.number()
    .min(1, "Calories must be at least 1")
    .max(10000, "Calories must not exceed 10000")
    .positive()
    .integer()
    .nullable(),
    
  category: Yup.string().required("Select a category"),
  
  ingredient: Yup.array()
    .of(ingredObjectSchema).min(2).required(),
    
  instruction: Yup.string()
    .max(1200, "Instructions should not exceed 1200 characters")
    .required("Instructions are required"),
    });

const handleSubmit = (values, actions) => {
    const formData = new FormData();
formData.append("name", values.name);
formData.append("category", values.category);
formData.append("cals", values.cals);
formData.append("cookiesTime", values.cookiesTime);
formData.append("instruction", values.instruction);
formData.append("decr", values.decr);

values.ingredient.forEach((ing, index) => {
  formData.append(`ingredient[${index}][id]`, ing.id);
  formData.append(`ingredient[${index}][ingredientAmount]`, ing.ingredientAmount);
});

formData.append("recipeImg", values.recipeImg);
  dispatch(addRecipe(formData));
  
  actions.resetForm();
  setPreviewImage(null);
  }
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
                    setFieldValue("recipeImg", e.currentTarget.files[0]);
                    setPreviewImage(URL.createObjectURL(e.currentTarget.files[0]));
                  }}
                  className={css.inputPhoto}
                />
                {previewImage
                  ? (<img src={previewImage} alt="preview" className={css.imagePreview} />)
                  : (<svg className={css.icon}>
                    <use href="/public/icons.svg#icon-camera" />
                  </svg>)}
              </div>
              <ErrorMessage name="recipeImg" component="div" className={css.error} />
            </div>
            <div className={css.formContent}>
             
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
                          setFieldValue("ingredient", [
                            ...values.ingredient,
                            {
                              id: values.currentIngredientId,
                              ingredientAmount: values.currentIngredientAmount,
                            },
                          ]);
                         console.log("in submit inged => values.ingredient: ", values.ingredient)
                          setFieldValue("currentIngredientId", "");
                          setFieldValue("currentIngredientAmount", "");
                        }
                      }}
                    >
                      Add new ingredient
                    </button>

                   
                    <div className={css.tabletOnly}>
                      <div className={css.column1}>Name</div>
                      <div className={css.column2}>Amount</div>
                    </div>

              
                    {values.ingredient.length > 0 && (
                      <div className={css.dropDown}>
                        <div className={css.dropDownColumns}>
                         
                          <div className={css.mobileOnly}>
                            <div className={css.column1}>Name</div>
                            <div className={css.column2}>Amount</div>
                          </div>

                          {values.ingredient.map((ing, index) => {
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
                                      const newIngredients = values.ingredient.filter(
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
                  <ErrorMessage name="ingredient" component="div" className={css.error} />
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
