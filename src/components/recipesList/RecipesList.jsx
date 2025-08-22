import RecipeCard from '../recipeCard/RecipeCard.jsx';
import styles from './RecipesList.module.css';

const RecipesList = ({ recipes, recipeType }) => {
    if (!recipes.length) {
        return <p className={styles.empty}>No recipes yet</p>;
    }

    return (
        <div className={styles.grid}>
            {recipes.map((recipe) => (
                <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    recipeType={recipeType}
                />
            ))}
        </div>
    );
};

export default RecipesList;