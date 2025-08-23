import { useEffect, useState } from 'react';
import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';

const RecipesList = ({ recipeType }) => {
  const [recipes, setRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);

  useEffect(() => {
    fetch('/recipes.json') // файл з public/
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error("Error loading recipes:", err));
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 16);
  };

  const visibleRecipes = recipes.slice(0, visibleCount);

  // Якщо рецептів немає
  if (recipes.length === 0) {
    return <p>No recipes available</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <p>{recipes.length} recipes</p>

      <ul>
        {visibleRecipes.map(recipe => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>
        ))}
      </ul>

      {visibleCount < recipes.length && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default RecipesList;
