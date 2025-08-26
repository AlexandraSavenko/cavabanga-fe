import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/recipes/favoritesSlice';
import { useNavigate } from 'react-router-dom';

import css from './RecipeCard.module.css';

const RecipeCard = ({ recipe, recipeType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector((state) => state.auth.isAuth);

  // Використовуємо _id з Mongo
  const recipeId = recipe._id;

  const isFavorite = useSelector((state) =>
    state.favorites.items.includes(recipeId)
  );

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate("/auth/login"); // у тебе ж шлях такий, а не "/login"
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(recipeId));
    } else {
      dispatch(addToFavorites(recipeId));
    }
  };

  return (
    <div className={css.card}>
      <img
        src={recipe.thumb || "/placeholder.jpg"}
        alt={recipe.title}
        className={css.image}
      />
      <h3 className={css.title}>{recipe.title}</h3>
      <p className={css.time}>⏱ {recipe.time || "-"}</p>
      <p className={css.desc}>{recipe.description}</p>
      <p className={css.cals}>
        {recipe.cals ? `~${recipe.cals} cals` : "-"}
      </p>

      <button
        className={css.btn}
        onClick={() => navigate(`/recipes/${recipeId}`)}
      >
        Learn more
      </button>

      {recipeType !== 'own' && (
        <button
          className={css.favoritesBtn}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}
    </div>
  );
};

export default RecipeCard;

