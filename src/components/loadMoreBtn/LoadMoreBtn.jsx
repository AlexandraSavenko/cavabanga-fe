import { useState } from 'react';
import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';

const RecipesList = ({ recipes = [], recipeType }) => {
  const [visibleCount, setVisibleCount] = useState(16);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 16);
  };

  const visibleRecipes = recipes.slice(0, visibleCount);

  return (
    <div>
      <div>
        <h2>Reepies</h2>
        <p>{recipes.length} recipes</p>
      </div>

      <ul>
        {visibleRecipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard 
              recipe={recipe} 
              recipeType={recipeType}
            />
          </li>
        ))}
      </ul>

      {visibleCount < recipes.length && (
        <div>
          <LoadMoreBtn onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

export default RecipesList;
