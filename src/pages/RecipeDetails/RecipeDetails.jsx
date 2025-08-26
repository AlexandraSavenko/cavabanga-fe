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

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    const fetchRecipe = async () => {
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
  }, [id, navigate]);

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
        category={recipe.category}
        cookingTime={recipe.cookiesTime}
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
