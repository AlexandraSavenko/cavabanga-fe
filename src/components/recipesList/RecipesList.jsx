import React, { useState, useEffect } from 'react';
import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';
import Pagination from '../pagination/Pagination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeList } from '../../redux/recipes/operations.js';
import { selectAllRecipes } from '../../redux/recipes/selectors.js';

const RecipesList = ({ recipeType }) => {
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);

  // Стан для кількості відображуваних рецептів
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    dispatch(getRecipeList(2));
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 16);
  };

  // Якщо рецептів немає
  if (!allRecipes || allRecipes.length === 0) {
    return <p>No recipes available</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <p>{allRecipes.length} recipes</p>
      <ul>
        {allRecipes.slice(0, visibleCount).map(recipe => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>
        ))}
      </ul>

      {visibleCount < allRecipes.length && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <Pagination />
    </div>
  );
};

export default RecipesList;
