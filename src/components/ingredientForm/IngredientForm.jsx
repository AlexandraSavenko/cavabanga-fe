import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../redux/filters/selectors";

const IngredientForm = ({setList}) => {
    const ingredientsList = useSelector(selectIngredients);

  const [ingredient, setIngredient] = useState("")
  const [amount, setAmount] = useState("")
  useEffect(() => {
    console.log("ingredient", ingredient)
        console.log("amount", amount)

  }, [ingredient, amount])
  const handleClick = () => {
    if(ingredient && amount){
      setList(prev => [...prev, {
      "id": ingredient,
      "ingredientAmount": amount
    }])
    }
  }
  return (
    <div>
      <Field as="select" name="ingredient" value={ingredient} onChange={e => {setIngredient(e.target.value)}}>
        <option >Select ingredient</option>
        {ingredientsList.map((ing) => (
          <option key={ing._id} value={ing._id}>
            {ing.name}
          </option>
        ))}
      </Field>
      <Field name="amount" placeholder="100g" value={amount} onChange={e=> setAmount(e.target.value)} />
        <button onClick={handleClick}>Add new ingredient</button>
    </div>
  );
};

export default IngredientForm;
