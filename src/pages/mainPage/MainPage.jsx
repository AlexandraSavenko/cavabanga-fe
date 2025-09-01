import React, { useEffect } from "react";
import css from "./MainPage.module.css";
import Loader from "../../components/loader/Loader";
import RecipesList from "../../components/recipesList/RecipesList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";

import { useDispatch, useSelector } from "react-redux";
import { selectAllRecipes, selectPage } from "../../redux/recipes/selectors";
import { getRecipeList } from "../../redux/recipes/operations";
import { selectCategory, selectSearchQuery, selectIngredient } from "../../redux/filters/selectors";

const MainPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);
  const page = useSelector(selectPage);
  const category = useSelector(selectCategory);
  const name = useSelector(selectSearchQuery);
  const ingredient = useSelector(selectIngredient);
  const isLoading = useSelector((state) => state.recipes.loading); // Стейт завантаження

  useEffect(() => {
    // Запит списку рецептів з урахуванням фільтрів та пошуку
    dispatch(getRecipeList({ type: "all", page, perPage: 12, category, name, ingredient }));
  }, [page, category, name, ingredient, dispatch]);

  if (isLoading) {
    return (
      <div className={css.wrap}>
        <SearchBox />
        <h2>Рецепти</h2>
        <Filters />
        <Loader /> {/* Показуємо лоадер поки іде запит */}
      </div>
    );
  }

  return (
    <div className={css.wrap}>
      <SearchBox />
      <h2>Рецепти</h2> {/* українською */}
      <Filters />
      <RecipesList allRecipes={allRecipes} recipeType={"all"} />
    </div>
  );
};

export default MainPage;