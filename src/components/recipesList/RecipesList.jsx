import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';
import Pagination from '../pagination/Pagination.jsx';

const RecipesList = ({allRecipes, recipeType }) => {

if(!Array.isArray(allRecipes)){
  return <p>Something went wrong</p>
}
  // Якщо рецептів немає
  if (allRecipes.length === 0) {
    return <p>No recipes available</p>;
  }
  return (
    <div>
      <h2>Recipes</h2>
      <p>{allRecipes.length} recipes</p>
      <ul>
        {allRecipes.map(recipe => 
          { return <li key={recipe._id}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>}
        )}
      </ul>
<Pagination />
    </div>
  );
};

export default RecipesList;
