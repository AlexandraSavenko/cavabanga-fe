import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../redux/recipes/favoritesSlice';
import { useNavigate } from 'react-router-dom';

import styles from './RecipeCard.module.css';


const RecipeCard = ({ recipe, recipeType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector((state) =>state.auth.isAuth);

    const isFavorite = useSelector((state) =>
        state.favorites.items.includes(recipe.id)
    );

    const handleFavoriteClick = () => {
        if (!isAuth) {
            navigate("/login");
            return;
        }

        if (isFavorite) {
            dispatch(removeFromFavorites(recipe.id));
        } else {
            dispatch(addToFavorites(recipe.id));
        }
    };

    return (
        <div className={styles.card}>
            <img
             src={recipe.image || "/placeholder.jpg"}
             alt={recipe.title}
             className={styles.image}
            />
            <h3 className={styles.title}>{recipe.title}</h3>
            <p className={styles.time}>⏱ {recipe.time || "-"}</p>
            <p className={styles.desc}>{recipe.desc}</p>
            <p className={styles.cals}> 
                {recipe.cals ? `~${recipe.cals} cals` : "-"} 
            </p>
            
            <button 
                className={styles.btn} 
                onClick={() => navigate(`/recipes/${recipe.id}`)}
            >
            Learn more
            </button>

            {recipeType !== 'own' && (
                <button 
                    className={styles.favoritesBtn} 
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? '❤️' : '🤍' }  
                </button>
            )}
        </div>
    );
};

export default RecipeCard;