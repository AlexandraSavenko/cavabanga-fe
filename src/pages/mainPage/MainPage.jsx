import React, { useEffect } from "react";
import css from "./MainPage.module.css";

import Logo from "../../components/logo/Logo";
import RecipesList from "../../components/recipesList/RecipesList";

import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { selectAllRecipes, selectLoading, selectPage } from "../../redux/recipes/selectors";
import { getRecipeList } from "../../redux/recipes/operations";

import { selectCategory, selectSearchQuery, selectIngredient } from "../../redux/filters/selectors";
import { getUserData } from "../../redux/auth/operations";
// import { resetFilters } from "../../redux/filters/slice";

const MainPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);
  const page = useSelector(selectPage);
  const loading = useSelector(selectLoading)


  const name = useSelector(selectSearchQuery);
  const ingredient = useSelector(selectIngredient);
  const category = useSelector(selectCategory);
   // Може, винести ресет фільтрів окремо і скидати їх лише один раз при першому рендері?
   // Чи взагалі прибрати, бо це скидання, здається, робить біду (Аня)
  //     useEffect(() => {
  //   dispatch(resetFilters());
  // }, [dispatch]);

  const handleGetUserData = () => {
    dispatch(getUserData())
  }
  useEffect(() => {
    dispatch(
      getRecipeList({ type: "all", page, perPage: 12, category, name, ingredient })
    );
    // dispatch(resetFilters());
  }, [page, category, name, ingredient, dispatch]);

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className={css.wrap}>
      <SearchBox />
      {name ? <h2>{`Search Results for “${name}”`}</h2> : <h2>Recepies</h2>}
      <Filters />
      <RecipesList allRecipes={allRecipes} recipeType={"all"} />
    </div>
  );
};

export default MainPage;
