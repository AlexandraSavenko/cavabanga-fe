import React, { useEffect } from "react";
import css from "./MainPage.module.css";
import RecipesList from "../../components/recipesList/RecipesList";
import NoMatchFound from "../../components/NoMatchFound/NoMatchFound"
import Pagination from "../../components/pagination/Pagination"
import Filters from "../../components/Filters/Filters";

import { useDispatch, useSelector } from "react-redux";
import { selectAllRecipes, selectPage, selectTotalItems } from "../../redux/recipes/selectors";
import { getRecipeList } from "../../redux/recipes/operations";
import { selectCategory, selectSearchQuery, selectIngredient } from "../../redux/filters/selectors";

const MainPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);
  const page = useSelector(selectPage);
  const category = useSelector(selectCategory);
  const name = useSelector(selectSearchQuery);
  const ingredient = useSelector(selectIngredient);
  const totalItems = useSelector(selectTotalItems)
  useEffect(() => {
    // Запит списку рецептів з урахуванням фільтрів та пошуку
    dispatch(getRecipeList({ type: "all", page, perPage: 12, category, name, ingredient }));
  }, [page, category, name, ingredient, dispatch]);
  return (
    <div className={css.wrap}>
      <Filters />
      <RecipesList allRecipes={allRecipes} recipeType={"all"} />
      {totalItems > 12 && <Pagination />}
      {allRecipes.length === 0 && <NoMatchFound/>}
    </div>
  );
};

export default MainPage;