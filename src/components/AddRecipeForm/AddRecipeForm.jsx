import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../loader/Loader";
import css from "./AddRecipeForm.module.css";

const AddRecipeForm = () => {
  const [categories, setCategories] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // підвантажуємо категорії/інгредієнти (за бажанням)
    let mounted = true;
    (async () => {
      try {
        const [catRes, ingRes] = await Promise.all([
          axios.get("/api/categories"),
          axios.get("/api/ingredients"),
        ]);
        if (!mounted) return;
        setCategories(catRes.data || []);
        setIngredientsList(ingRes.data || []);
      } catch (err) {
        // не критично — лишаємо пусті списки
        console.error("Error loading categories/ingredients", err);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const initialValues = {
    name: "",
    decr: "",
    cookingTime: "",
    cals: "",
    category: "",
    ingredients: [{ ingredient: "", ingredientAmount: "" }],
    instructions: "",
    photo: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Введіть назву рецепту"),
    decr: Yup.string().required("Дайте короткий опис рецепту"),
    cookingTime: Yup.number().required("Час приготування у хвилинах").positive().integer(),
    cals: Yup.number().positive().integer().nullable(),
    category: Yup.string().required("Оберіть категорію"),
    ingredients: Yup.array()
      .of(
        Yup.object({
          ingredient: Yup.string().required("Оберіть інгредієнт"),
          ingredientAmount: Yup.string().required("Вкажіть кількість"),
        })
      )
      .min(1, "Додайте хоча б один інгредієнт"),
    instructions: Yup.string().required("Введіть інструкцію"),
    photo: Yup.mixed().required("Додайте фото рецепту"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      // приклад відправки — адаптуй під бек
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("decr", values.decr);
      formData.append("cookingTime", values.cookingTime);
      formData.append("cals", values.cals || "");
      formData.append("category", values.category);
      formData.append("instructions", values.instructions);
      if (values.photo) formData.append("photo", values.photo);
      formData.append("ingredients", JSON.stringify(values.ingredients));

      await axios.post("/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      setPreviewImage(null);
      // можна додати навігацію або повідомлення
    } catch (error) {
      console.error("Помилка при створенні рецепту", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.formWrap}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <>
            {isSubmitting && <Loader />} {/* показ лоадера під час сабміту */}
            <Form className={css.form}>
              <label>
                Назва
                <Field name="name" placeholder="Назва рецепту" />
              </label>

              <label>
                Короткий опис
                <Field name="decr" as="textarea" placeholder="Короткий опис" />
              </label>

              <label>
                Час приготування (хв)
                <Field name="cookingTime" type="number" />
              </label>

              <label>
                Калорії
                <Field name="cals" type="number" />
              </label>

              <label>
                Категорія
                <Field name="category" as="select">
                  <option value="">Оберіть категорію</option>
                  {categories.map((c) => (
                    <option key={c._id || c.id || c} value={c._id || c.id || c}>
                      {c.name || c}
                    </option>
                  ))}
                </Field>
              </label>

              <FieldArray name="ingredients">
                {({ remove, push }) => (
                  <div>
                    <h4>Інгредієнти</h4>
                    {values.ingredients &&
                      values.ingredients.map((_, index) => (
                        <div key={index} className={css.ingredientRow}>
                          <Field name={`ingredients.${index}.ingredient`} as="select">
                            <option value="">Оберіть інгредієнт</option>
                            {ingredientsList.map((ing) => (
                              <option key={ing._id || ing.id || ing} value={ing._id || ing.id || ing}>
                                {ing.name || ing}
                              </option>
                            ))}
                          </Field>
                          <Field name={`ingredients.${index}.ingredientAmount`} placeholder="Кількість" />
                          <button type="button" onClick={() => remove(index)}>
                            Видалити
                          </button>
                        </div>
                      ))}
                    <button type="button" onClick={() => push({ ingredient: "", ingredientAmount: "" })}>
                      Додати інгредієнт
                    </button>
                  </div>
                )}
              </FieldArray>

              <label>
                Інструкції
                <Field name="instructions" as="textarea" />
              </label>

              <label>
                Фото
                <input
                  name="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    setFieldValue("photo", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => setPreviewImage(reader.result);
                      reader.readAsDataURL(file);
                    } else {
                      setPreviewImage(null);
                    }
                  }}
                />
              </label>

              {previewImage && <img src={previewImage} alt="preview" className={css.preview} />}

              <button type="submit" disabled={isSubmitting}>
                Додати рецепт
              </button>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default AddRecipeForm;
