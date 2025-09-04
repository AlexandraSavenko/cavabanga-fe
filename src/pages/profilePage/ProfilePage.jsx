import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ProfileNavigation from '../../components/profileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/recipesList/RecipesList.jsx';
import styles from './ProfilePage.module.css';
import { getRecipeList, getUserFavourites } from '../../redux/recipes/operations.js';
import { selectAllRecipes, selectUserFavourites, selectPage } from '../../redux/recipes/selectors.js';
import { resetFilters } from '../../redux/filters/slice.js';
import FilterCount from '../../components/filterCount/FilterCount.jsx';
import NoRecipesYet from '../../components/NoRecipesYet/NoRecipesYet.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';

const ProfilePage = () => {
  const { recipeType } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const favRecipes = useSelector(selectUserFavourites);

  const page = useSelector(selectPage)
  
  useEffect(() => {
    dispatch(resetFilters())
    recipeType === "own" ?
    dispatch(getRecipeList({ type: recipeType, page, perPage: 12 })) :
    dispatch(getUserFavourites())
  }, [dispatch, recipeType, page])
  
  let showedRecipes = [];
  if (recipeType === "own") {
    showedRecipes = recipes;
  } else if (recipeType === "favorites") {
    showedRecipes = favRecipes;
  }
  const totalItems = showedRecipes.length;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My profile</h2> {/* українською */}
      <ProfileNavigation />
      <FilterCount recipeNumber={totalItems} />
      <RecipesList allRecipes={showedRecipes} recipeType={recipeType} />
      {totalItems > 12 && recipeType === "own" && <Pagination />}
      {recipeType === "own"
        && showedRecipes.length === 0
        && <NoRecipesYet recipesType={"own"}>
          <Link className={styles.linkBtn} to={"/add-recipe"}>
            Add Recipe
          </Link>
        </NoRecipesYet>}
      {recipeType === "favorites"
        && showedRecipes.length === 0
        && <NoRecipesYet recipesType={"favorites"}>
          <Link className={styles.linkBtn} to={"/"}>
            Browse Recipes
          </Link>
        </NoRecipesYet>}
    </div>
  );
};

export default ProfilePage;