import React, { useEffect } from "react";
import css from "./MainPage.module.css";

import Logo from "../../components/logo/Logo";
import RecipesList from "../../components/recipesList/RecipesList";

import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { selectAllRecipes, selectPage } from "../../redux/recipes/selectors";
import { getRecipeList } from "../../redux/recipes/operations";

const MainPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);
  const page = useSelector(selectPage)
  useEffect(() => {
  dispatch(getRecipeList({type: "all", page, perPage: 12}))
}, [page, dispatch])
  return (
    <div className={css.wrap}>
      <SearchBox onSearch={() => {}} />
      <Filters />
      <RecipesList allRecipes={allRecipes} recipeType={"all"} />
    </div>
  );
};

export default MainPage;
