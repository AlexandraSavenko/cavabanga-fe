import { useDispatch, useSelector } from 'react-redux';
// import { addToFavorites, removeFromFavorites } from '../../redux/recipes/favoritesSlice';
import { useNavigate } from 'react-router-dom';

import css from './RecipeCard.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { toggleFavourites } from '../../redux/recipes/operations';
import { selectUserFavourites } from '../../redux/recipes/selectors';


const RecipeCard = ({ recipe, recipeType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsLoggedIn);
    const userFavorites = useSelector(selectUserFavourites);
    const isFavorite = userFavorites.includes(recipe.id)

    const handleFavoriteClick = () => {
        if (!isAuth) {
            navigate("/login");
            return;
        }

       dispatch(toggleFavourites({recipeId: recipe._id}))
    };

    return (
        <div className={css.card}>
            <img            
             src={recipe.thumb || "/placeholder.jpg"}
             alt={recipe.title}
             className={css.image}
            />
            <h3 className={css.title}>{recipe.title}</h3>
            {/* <p className={css.time}>⏱ {recipe.time || "-"}</p> */}
            <p className={css.desc}>{recipe.description}</p>
            {/* <p className={css.cals}> 
                {recipe.cals ? `~${recipe.cals} cals` : "-"} 
            </p> */}
            
            <button 
                className={css.btn} 
                onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
            Learn more
            </button>

            {recipeType !== 'own' && (
                <button 
                    className={css.favoritesBtn} 
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? '❤️' : '🤍' }  
                </button>
            )}
        </div>
    );
};

export default RecipeCard;