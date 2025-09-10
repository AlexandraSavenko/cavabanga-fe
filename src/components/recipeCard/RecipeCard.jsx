import { useDispatch, useSelector } from "react-redux";
// import { addToFavorites, removeFromFavorites } from '../../redux/recipes/favoritesSlice';
import { useNavigate } from "react-router-dom";

import css from "./RecipeCard.module.css";
import { selectFavIds, selectIsLoggedIn } from "../../redux/auth/selectors";
import { toggleFavorites } from "../../redux/recipes/operations";
import { useState } from "react";
import ModalNotAutor from "../modalNotAutor/ModalNotAutor";
import SaveButton from "../recipeDetails/SaveButton/SaveButton";
import { addToFav, deleteFromFav } from "../../redux/auth/slice";

const RecipeCard = ({ recipe, recipeType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsLoggedIn);
  const userFavorites = useSelector(selectFavIds);
  const [showModal, setShowModal] = useState(false);
  const isFavorite = userFavorites.includes(recipe._id);
  const toDo = !isFavorite ? "add" : "delete";
  const handleFavoriteClick = () => {
    if (!isAuth) {
      setShowModal(true)
      return;
    }
    if(isFavorite){
      dispatch(deleteFromFav(recipe._id))
    }else{
      dispatch(addToFav(recipe._id))
    }
    dispatch(toggleFavorites({ recipeId: recipe._id, toDo }));
    
  };
  return (
    <div className={css.card}>
<div className={css.imgWrap}>
      <img
        src={recipe.recipeImg || "/placeholder.jpg"}
        alt={recipe.name}
        className={css.image}
      />
</div>
      <div className={css.cardContent}>

        <div className={css.wrapper}>
          <h3 className={css.title}>{recipe.name}</h3>
          <div className={css.timeWrapper}>
            <svg className={css.icon}>
              <use href="/icons.svg#icon-time-clock" />
            </svg>
            <p>{recipe.cookiesTime || "-"}</p>
          </div>
        </div>
        <p className={css.desc}>{recipe.decr}</p>

        <p className={css.cals}>{recipe.cals ? `~${recipe.cals} cals` : "N/A"}</p>


      </div>


      <div className={css.btnWrap}>
        <button
          className={css.btn}
          onClick={() => navigate(`/recipes/${recipe._id}`)}
        >
          Learn more
        </button>
        {recipeType !== "own" && <SaveButton onClick={handleFavoriteClick} isFavorite={isFavorite} />}
      </div>

      {showModal && <ModalNotAutor modalOpen={setShowModal} />}


    </div>






  );
};

export default RecipeCard;
