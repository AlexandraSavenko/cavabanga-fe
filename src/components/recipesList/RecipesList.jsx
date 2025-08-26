import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, clearRecipes } from '../../redux/recipes/recipesSlice';
import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';

const RecipesList = ({ recipeType }) => {
  const dispatch = useDispatch();
  const { items, loading, error, hasMore, page } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(clearRecipes());
    dispatch(fetchRecipes({ type: recipeType, page: 1 }));
  }, [dispatch, recipeType]);

  const handleLoadMore = () => {
    dispatch(fetchRecipes({ type: recipeType, page }));
  };

  if (loading && items.length === 0) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!items || items.length === 0) return <p>No recipes available</p>;

  return (
    <div>
      <h2>Recipes</h2>
      <p>{items.length} recipes</p>

      <ul>
        {items.map(recipe => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>
        ))}
      </ul>

      {hasMore && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};

export default RecipesList;
