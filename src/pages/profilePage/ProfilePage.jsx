import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ProfileNavigation from '../../components/profileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/recipesList/RecipesList.jsx';
import styles from './ProfilePage.module.css';
import { getRecipeList, getUserFavourites } from '../../redux/recipes/operations.js';
import { selectAllRecipes, selectUserFavourites, selectTotalItems } from '../../redux/recipes/selectors.js';
import { resetFilters } from '../../redux/filters/slice.js';
import FilterCount from '../../components/filterCount/FilterCount.jsx';
import NoRecipesYet from '../../components/NoRecipesYet/NoRecipesYet.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const favRecipes = useSelector(selectUserFavourites);
  const totalItems = useSelector(selectTotalItems);
  
  useEffect(() => {
    dispatch(resetFilters())
    recipeType === "own" ?
    dispatch(getRecipeList({ type: recipeType, page: 1, perPage: 12 })) :
    dispatch(getUserFavourites())
  }, [dispatch, recipeType])
  
  let showedRecipes = [];
  if (recipeType === "own") {
    showedRecipes = recipes;
  } else if (recipeType === "favorites") {
    showedRecipes = favRecipes;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My profile</h2>
      <ProfileNavigation />
      <FilterCount recipeNumber={totalItems} />
      <RecipesList allRecipes={showedRecipes} recipeType={recipeType} />
      {totalItems > 12 && <Pagination />}
      {showedRecipes.length === 0 &&
        recipeType === "own"
        ? <NoRecipesYet recipesType={"own"}>
          <Link className={styles.linkBtn} to={"/add-recipe"}>
            Add Recipe
          </Link>
        </NoRecipesYet>
        : <NoRecipesYet recipesType={"favorites"}>
          <Link className={styles.linkBtn} to={"/"}>
            Browse Recipes
          </Link>
        </NoRecipesYet>}
    </div>
  );
};

export default ProfilePage;