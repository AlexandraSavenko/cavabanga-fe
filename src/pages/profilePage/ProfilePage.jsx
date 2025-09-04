import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import ProfileNavigation from '../../components/profileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/recipesList/RecipesList.jsx';
import styles from './ProfilePage.module.css';
import { getOwnRecipeList, getUserFavourites } from '../../redux/recipes/operations.js';
import { selectUserFavourites, selectOwnRecipes, selectOwnPage, selectTotalOwnItems } from '../../redux/recipes/selectors.js';
import { resetFilters } from '../../redux/filters/slice.js';
import FilterCount from '../../components/filterCount/FilterCount.jsx';
import NoRecipesYet from '../../components/NoRecipesYet/NoRecipesYet.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';


const ProfilePage = () => {
  const { recipeType } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector(selectOwnRecipes);
  const favRecipes = useSelector(selectUserFavourites);

  const page = useSelector(selectOwnPage)
  const totalOwnCount = useSelector(selectTotalOwnItems)
  useEffect(() => {
    dispatch(resetFilters())
    recipeType === "own" ?
    dispatch(getOwnRecipeList({page, perPage: 12 })) :
    dispatch(getUserFavourites())
  }, [dispatch, recipeType, page])
  
  let showedRecipes = [];
  let totalItems = 0;
  if (recipeType === "own") {
    showedRecipes = recipes;
    totalItems = totalOwnCount;
  } else if (recipeType === "favorites") {
    showedRecipes = favRecipes;  
    totalItems = favRecipes.length;
  }

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