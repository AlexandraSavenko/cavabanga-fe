import RecipeTitle from "../../components/recipeDetails/RecipeTitle/RecipeTitle";
import RecipeImage from "../../components/recipeDetails/RecipeImage/RecipeImage";
import RecipeSection from "../../components/recipeDetails/RecipeSection/RecipeSection";
import GeneralInfo from "../../components/recipeDetails/GeneralInfo/GeneralInfo";
import SaveButton from "../../components/recipeDetails/SaveButton/SaveButton";
import css from "./RecipeDetails.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/recipes/favoritesSlice";
import { selectAllRecipes } from "../../redux/recipes/selectors";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipeArr = useSelector(selectAllRecipes);
  const existingRecipe = recipeArr.find((recipe) => recipe._id === id);
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(id);
  const [recipe, setRecipe] = useState(existingRecipe || null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (existingRecipe) return;
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/recipes/${id}`
        );
        setRecipe(data.data); // бек повертає { data: recipe }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("*");
        } else {
          console.error("Server error:", error);
        }
      }
    };

    fetchRecipe();
  }, [id, navigate, existingRecipe]);

  if (!recipe) return <p>Loading...</p>;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  return (
    <div className={css.recipeDetails}>
      <RecipeTitle title={recipe.name} />
      <RecipeImage src={recipe.recipeImg} alt={recipe.name} />
      <GeneralInfo
        category={recipe.category?.name || "Unknown"}
        cookingTime={recipe.cookingTime}
        calories={recipe.cals}
      />
      <RecipeSection
        about={recipe.decr}
        ingredients={recipe.ingredient}
        instructions={recipe.instruction}
      />
      <SaveButton onClick={handleFavorite} isFavorite={isFavorite} />
    </div>
  );
}
