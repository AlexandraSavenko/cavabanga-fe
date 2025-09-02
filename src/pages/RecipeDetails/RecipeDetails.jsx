import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import css from "./RecipeDetails.module.css";
import Loader from "../../components/loader/Loader";
import ModalNotAutor from "../../components/modalNotAutor/ModalNotAutor";
import RecipeTitle from "../../components/recipeDetails/RecipeTitle/RecipeTitle";
import RecipeImage from "../../components/recipeDetails/RecipeImage/RecipeImage";
import GeneralInfo from "../../components/recipeDetails/GeneralInfo/GeneralInfo";
import RecipeSection from "../../components/recipeDetails/RecipeSection/RecipeSection";
import SaveButton from "../../components/recipeDetails/SaveButton/SaveButton";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectAllRecipes, selectFavRecipesIds } from "../../redux/recipes/selectors";
import { toggleFavorites } from "../../redux/recipes/operations";

export default function RecipeDetails() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(selectIsLoggedIn);
  const recipeArr = useSelector(selectAllRecipes);
  const existingRecipe = recipeArr.find((recipe) => recipe._id === id);

  const favorites = useSelector(selectFavRecipesIds) || []; // Захист від undefined
  const isFavorite = favorites.includes(id);

  const [recipe, setRecipe] = useState(existingRecipe || null);
  const [isLoading, setIsLoading] = useState(false); // Локальний лоадер при завантаженні одного рецепта

  const toDo = !isFavorite ? "add" : "delete";

  useEffect(() => {
    console.log("Recipe from backend:", recipe);
    const fetchRecipe = async () => {
      if (existingRecipe) return;
      setIsLoading(true);
      try {
        const { data } = await axios.get(`/api/recipes/${id}`);
        setRecipe(data.data || data); // Підстраховка під формат відповіді
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("*");
        } else {
          console.error("Помилка завантаження рецепта", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id, navigate, existingRecipe]);

  if (isLoading || !recipe) return <Loader />; // Показуємо лоадер поки нема даних

  const handleFavoriteClick = () => {
    if (!isAuth) {
      setShowModal(true);
      return;
    }
    dispatch(toggleFavorites({ recipeId: recipe._id, toDo }));
  };

  return (
    <div className={css.recipeDetails}>
      <RecipeTitle title={recipe.name} />
      <RecipeImage src={recipe.recipeImg} alt={recipe.name} />
      <div className={css.DesctopWrap}>
        <div className={css.generalButtonWrap}>
          <GeneralInfo
            category={recipe.category || "Unknown"}
            cookingTime={recipe.cookiesTime}
            cals={recipe.cals}
          />
          <SaveButton onClick={handleFavoriteClick} isFavorite={isFavorite} />
          {showModal && <ModalNotAutor modalOpen={setShowModal} />}
        </div>
        <div className={css.infoContainer}>
          <div className={css.textInfoWrap}>
            <RecipeSection
              about={recipe.decr}
              ingredients={recipe.ingredient}
              instructions={recipe.instruction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}