import { Field } from "formik";
import React from "react";

const IngredientForm = ({ ingredientsList }) => {
  return (
    <div>
      <Field as="select" name="currentIngredientId">
        <option value="">Select ingredient</option>
        {ingredientsList.map((ing) => (
          <option key={ing._id} value={ing._id}>
            {ing.name}
          </option>
        ))}
      </Field>
      <Field name="currentIngredientAmount" placeholder="100g" />
    </div>
  );
};

export default IngredientForm;
