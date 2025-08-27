import React from "react";
import css from "./MainPage.module.css";
import React from "react";
import css from "./MainPage.module.css";

import Logo from "../../components/logo/Logo";
import RecipesList from "../../components/recipesList/RecipesList";

import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";
import { selectFilter } from "../../redux/filters/selectors";
import { resetFilters } from "../../redux/filters/slice";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectFilter);
  useEffect(() => {
    dispatch(resetFilters());
    return () => dispatch(resetFilters());
  }, [dispatch]);

  return (
    <div className={css.wrap}>
      <SearchBox />
      <div className="section">
        <div className="container">
          <h2 className={css.title}>
            {searchValue ? `Search results for "${searchValue}"` : "Recipes"}
          </h2>
          <Filters />
          <RecipesList recipeType={"own"} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
