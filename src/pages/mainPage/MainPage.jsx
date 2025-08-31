import React, { useEffect } from "react";
import css from "./MainPage.module.css";

import Logo from "../../components/logo/Logo";
import RecipesList from "../../components/recipesList/RecipesList";

import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";
import { useDispatch, useSelector } from "react-redux";
import { selectAllRecipes, selectPage } from "../../redux/recipes/selectors";
import { getRecipeList } from "../../redux/recipes/operations";

import { selectCategory, selectIngredient } from "../../redux/filters/selectors";
// import { resetFilters } from "../../redux/filters/slice";

const MainPage = () => {
  const dispatch = useDispatch();
  const allRecipes = useSelector(selectAllRecipes);
  const page = useSelector(selectPage);

  // const searchValue = useSelector(selectFilter);
  // const ingredient = useSelector(selectIngredient);
  const category = useSelector(selectCategory);
   // Може, винести ресет фільтрів окремо і скидати їх лише один раз при першому рендері?
   // Чи взагалі прибрати, бо це скидання, здається, робить біду (Аня)
  //     useEffect(() => {
  //   dispatch(resetFilters());
  // }, [dispatch]);
  useEffect(() => {
    dispatch(
      getRecipeList({ type: "all", page, perPage: 12, category })
    );
    // dispatch(resetFilters());
  }, [page, category, dispatch]);

  return (
    <div className={css.wrap}>
      <SearchBox />
      <h2>Recepies</h2>
      <Filters />
      <RecipesList allRecipes={allRecipes} recipeType={"all"} />
    </div>
  );
};

export default MainPage;
