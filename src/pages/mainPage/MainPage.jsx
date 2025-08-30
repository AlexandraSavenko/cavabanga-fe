import React, { useEffect } from "react";

import css from "./MainPage.module.css";
import Loader from "../../components/loader/Loader";
import Logo from "../../components/logo/Logo";
import RecipesList from "../../components/recipesList/RecipesList";

import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { selectAllRecipes, selectPage } from "../../redux/recipes/selectors";
import { getRecipeList } from "../../redux/recipes/operations";

import { selectCategory } from "../../redux/filters/selectors";
import { resetFilters } from "../../redux/filters/slice";

const MainPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);
  const page = useSelector(selectPage);
  const category = useSelector(selectCategory);
  const isLoading = useSelector((state) => state.recipes.loading); // ДОДАНО

  useEffect(() => {
    dispatch(
      getRecipeList({ type: "all", page, perPage: 12, filter: category })
    );
    dispatch(resetFilters());
  }, [page, category, dispatch]);

  return (
    <div className={css.wrap}>
      <SearchBox />
      <h2>Рецепти</h2> {/* УКР. */}
      <Filters />
      {isLoading ? (
        <Loader />
      ) : (
        <RecipesList allRecipes={allRecipes} recipeType={"all"} />
      )}
    </div>
  );
};

export default MainPage;