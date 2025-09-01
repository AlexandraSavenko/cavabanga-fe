import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProfileNavigation from "../../components/profileNavigation/ProfileNavigation.jsx";
import RecipesList from "../../components/recipesList/RecipesList.jsx";
import Loader from "../../components/loader/Loader";
import FilterCount from "../../components/filterCount/FilterCount.jsx";

import styles from "./ProfilePage.module.css";
import { getRecipeList, getUserFavourites } from "../../redux/recipes/operations.js";
import { selectAllRecipes, selectUserFavourites } from "../../redux/recipes/selectors.js";
import { resetFilters } from "../../redux/filters/slice"; // Скидаємо фільтри при вході в профіль

const ProfilePage = () => {
  const { recipeType } = useParams();
  const dispatch = useDispatch();
  const recipes = useSelector(selectAllRecipes);
  const favRecipes = useSelector(selectUserFavourites);
  const isLoading = useSelector((state) => state.recipes.loading); // Стейт завантаження

  useEffect(() => {
    // Скидаємо фільтри і запитуємо власні рецепти або фаворити
    dispatch(resetFilters());
    if (recipeType === "own") {
      dispatch(getRecipeList({ type: recipeType, page: 1, perPage: 12 }));
    } else {
      dispatch(getUserFavourites());
    }
  }, [dispatch, recipeType]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мій профіль</h2> {/* українською */}
      <ProfileNavigation />
      {isLoading ? (
        <Loader /> /* показуємо лоадер під час завантаження own або favourites */
      ) : (
        <>
          <FilterCount recipeNumber={recipeType === "own" ? recipes.length : favRecipes.length} />
          <RecipesList allRecipes={recipeType === "own" ? recipes : favRecipes} recipeType={recipeType} />
        </>
      )}
    </div>
  );
};

export default ProfilePage;