import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


import css from "./RecipeDetails.module.css";
import ModalNotAutor from "../../components/modalNotAutor/ModalNotAutor";
import RecipeTitle from "../../components/recipeDetails/RecipeTitle/RecipeTitle";
import RecipeImage from "../../components/recipeDetails/RecipeImage/RecipeImage";
import GeneralInfo from "../../components/recipeDetails/GeneralInfo/GeneralInfo";
import RecipeSection from "../../components/recipeDetails/RecipeSection/RecipeSection";
import SaveButton from "../../components/recipeDetails/SaveButton/SaveButton";

import { selectFavIds, selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectOneRecipe } from "../../redux/recipes/selectors";
import { fetchRecipe, toggleFavorites } from "../../redux/recipes/operations";
import { addToFav, deleteFromFav } from "../../redux/auth/slice";

export default function RecipeDetails() {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
const recipe = useSelector(selectOneRecipe)

  const isAuth = useSelector(selectIsLoggedIn);


  const favorites = useSelector(selectFavIds) || []; // Захист від undefined
  const isFavorite = favorites.includes(id);

  const toDo = !isFavorite ? "add" : "delete";

  useEffect(() => {
    dispatch(fetchRecipe(id));
  }, [id, dispatch]);

  const handleFavoriteClick = () => {
    if (!isAuth) {
      setShowModal(true);
      return;
    }
    if(isFavorite){
          dispatch(deleteFromFav(recipe._id))
        }else{
          dispatch(addToFav(recipe._id))
        }
    dispatch(toggleFavorites({ recipeId: recipe._id, toDo }));
  };
if(!recipe) return (<div className={css.errorMessWrap}>
  <p>Sorry, something went wrong.</p>
  <p>Please try again.</p>
  <Link className={css.messLink} to={"/"}>Browse recipes</Link>
</div>);
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