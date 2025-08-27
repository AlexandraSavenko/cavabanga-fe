import { useEffect, useState } from 'react';
import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeList } from '../../redux/recipes/operations.js';
import { selectAllRecipes } from '../../redux/recipes/selectors.js';
import Pagination from '../pagination/Pagination.jsx';



const RecipesList = ({ recipeType }) => {
  const dispatch = useDispatch()
  const allRecipes = useSelector(selectAllRecipes)
  const [page, setPage] = useState(1)


useEffect(() => {
  dispatch(getRecipeList({page, perPage: 12}))
}, [page, dispatch])



  // Якщо рецептів немає
  if (allRecipes.length === 0) {
    return <p>No recipes available</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      <p>{allRecipes.length} recipes</p>

      <ul>
        {allRecipes.map(recipe => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>
        ))}
      </ul>

<Pagination onPageChange={setPage} />
    </div>
  );
};

export default RecipesList;
