import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';
import Pagination from '../pagination/Pagination.jsx';

import style from './RecipesList.module.css';

const RecipesList = ({ allRecipes, recipeType }) => {

  if (!Array.isArray(allRecipes)) {
    return <p>Something went wrong</p>
  }
  // Якщо рецептів немає
  if (allRecipes.length === 0) {
    return <p>No recipes available</p>;
  }
  return (
    <div className={style.container}>
      <h2 className={style.title}>Recipes</h2>
      <p>{allRecipes.length} recipes</p>
      <ul className={style.list}>
        {allRecipes.map(recipe => {
          return <li key={recipe._id}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>
        }
        )}
      </ul>
      <Pagination />
    </div>
  );
};

export default RecipesList;
