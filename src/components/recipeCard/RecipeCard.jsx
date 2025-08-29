import { useDispatch, useSelector } from "react-redux";
// import { addToFavorites, removeFromFavorites } from '../../redux/recipes/favoritesSlice';
import { useNavigate } from "react-router-dom";

import css from "./RecipeCard.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectFavRecipesIds } from "../../redux/recipes/selectors";
import { toggleFavorites } from "../../redux/recipes/operations";
import { useState } from "react";
import ModalNotAutor from "../modalNotAutor/ModalNotAutor";
import SaveButton from "../recipeDetails/SaveButton/SaveButton";

const RecipeCard = ({ recipe, recipeType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsLoggedIn);
  const userFavorites = useSelector(selectFavRecipesIds);
    const [showModal, setShowModal] = useState(false);
  const isFavorite = userFavorites.includes(recipe._id);
  const toDo = !isFavorite ? "add" : "delete";
  const handleFavoriteClick = () => {
    if (!isAuth) {
      setShowModal(true)
      return;
    }
    dispatch(toggleFavorites({ recipeId: recipe._id, toDo }));
  };
  return (
    <div className={css.card}>
      <img
        src={recipe.recipeImg || "/placeholder.jpg"}
        alt={recipe.name}
        className={css.image}
      />
      <h3 className={css.title}>{recipe.name}</h3>
      {/* <p className={css.time}>⏱ {recipe.time || "-"}</p> */}
      <p className={css.desc}>{recipe.description}</p>
      {/* <p className={css.cals}> 
                {recipe.cals ? `~${recipe.cals} cals` : "-"} 
            </p> */}

      <button
        className={css.btn}
        onClick={() => navigate(`/recipes/${recipe._id}`)}
      >
        Learn more
      </button>

      {recipeType !== "own" && <SaveButton onClick={handleFavoriteClick} isFavorite={isFavorite} />}
      {showModal && <ModalNotAutor modalOpen={setShowModal}/> }
    </div>
  );
};

export default RecipeCard;
