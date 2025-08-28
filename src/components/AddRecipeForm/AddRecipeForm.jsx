import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import css from "./AddRecipeForm.module.css"; 



const AddRecipeForm = () => {
  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios.get("/api/categories").then(res => setCategories(res.data));
    axios.get("/api/ingredients").then(res => setIngredientsList(res.data));
  }, []);

  const initialValues = {
    name: "",
    decr: "",
    cookiesTime: "",
    cals: "",
    category: "",
    ingredient: "",
    ingredientAmount: "",
    ingredients: [],
    instructions: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Enter the name of your recipe"),
    decr: Yup.string().required("Enter a brief description of your recipe"),
    cookiesTime: Yup.number().required("Cooking time in minute").positive().integer(),
    cals: Yup.number().positive().integer(),
    category: Yup.string().required("Select a category"),
    ingredients: Yup.array()
      .of(
        Yup.object({
          ingredient: Yup.string().required("Select an ingredient"),
          ingredientAmount: Yup.string().required("Specify the Amount"),
        })
      )
      .min(1, "Add at least one ingredient"),
    instructions: Yup.string().required("Enter a text"),
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
        <Form className={css.form}>

          
          <div className={css.photoboxWrapper}>
            <label className={css.label}>Upload Photo</label>
             <div className={css.photobox}>
            <input
              type="file"
              onChange={(e) => {
                setFieldValue("photo", e.currentTarget.files[0]);
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
                
      <img
       src={previewImage}
       alt="preview"
       className={css.imagePreview}
     />
  )}
    </div>      
            
    <ErrorMessage name="photo" component="div" className={css.error}/>
    </div>

          <section className={css.section}>General Information
          <div className={css.fieldBlock}>
            <label className={css.labels}>Recipe Title</label>
            <Field name="name" className={css.textarea} placeholder="Enter the name of your recipe"/>
            <ErrorMessage name="name" component="div" className={css.error}/>
          </div>

         
          <div className={css.fieldBlock}>
            <label className={css.labels}>Recipe Description</label>
            <Field as="textarea" name="decr" className={css.textarea} placeholder="Enter a brief description of your recipe"/>
            <ErrorMessage name="decr" component="div" className={css.error}/>
          </div>

          
          <div className={css.fieldBlock}>
            <label className={css.labels}>Cooking time in minutes(min)</label>
            <Field type="number" name="cookiesTime" className={css.input} placeholder="10"/>
            <ErrorMessage name="cookiesTime" component="div" className={css.error}/>
          </div>

         <div className={css.twoColumns}>
          <div className={css.fieldBlock}>
            <label className={css.labels}>Calories</label>
            <Field type="number" name="cals" className={css.input} placeholder="150 cals"/>
            <ErrorMessage name="cals" component="div" className={css.error}/>
          </div>

          
          <div className={css.fieldBlock}>
            <label className={css.labels}>Category</label>
            <Field as="select" name="category" className={css.input} placeholder="Soup">
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
                </Field>
               <ErrorMessage name="category" component="div" className={css.error}/>
              </div>
              </div>
          </section>


  <section className={css.section}>Ingredients
            <div className={css.fieldBlock}>
              
  <label className={css.labels}>Name</label>
   
  <Field as="select" name="ingredient" className={css.input} placeholder="Broccoli">
    <option value=""></option>
    {ingredientsList.map(ing => (
      <option key={ing._id} value={ing._id}>{ing.name}</option>
    ))}
  </Field>
   <label className={css.labels}>Amount</label>
    <Field name="ingredientAmount" placeholder="100g" className={css.input} />

    <button
    type="button"
    onClick={() => {
      if (values.ingredient && values.ingredientAmount) {
        setFieldValue("ingredients", [
          ...values.ingredients,
          { ingredient: values.ingredient, ingredientAmount: values.ingredientAmount }
        ]);
        setFieldValue("ingredient", "");
        setFieldValue("ingredientAmount", "");
      }
    }}
    className={css.button}
  >
    Add new ingredient
  </button>

    {values.ingredients.length > 0 && (
    <div className={css.selectedIngredients}>
      {values.ingredients.map((ing, index) => {
        const ingredientName = ingredientsList.find(i => i._id === ing.ingredient)?.name || "Unknown";
        return (
          <div key={index} className={css.ingredientItem}>
            <span>{ingredientName} - {ing.ingredientAmount}г</span>
            <button
              type="button"
              onClick={() => {
                const newIngredients = values.ingredients.filter((_, i) => i !== index);
                setFieldValue("ingredients", newIngredients);
              }}
              className={css.deleteButton}
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  )}
    <ErrorMessage name="ingredients" component="div" className={css.error}/>
   </div>
          </section>

          <section className={css.section}>
          <div className={css.fieldBlock}>
              <label className={css.label}>Instructions</label>
                <Field as="textarea"name="instructions"className={css.textarea} placeholder="Enter a text"/>
               
                 
          
            <ErrorMessage name="instructions" component="div" className={css.error}/>
          </div>
</section>
          
          <button type="submit" disabled={isSubmitting} className={css.button}>
            Publish Recipe
          </button>

        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;
