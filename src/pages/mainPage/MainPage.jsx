import React from "react";
import css from "./MainPage.module.css";

import Logo from "../../components/logo/Logo";
import RecipesList from "../../components/recipesList/RecipesList";

import SearchBox from "../../components/SearchBox/SearchBox";
import Filters from "../../components/Filters/Filters";

const MainPage = () => {
  return (
    <div className={css.wrap}>
      this is where recipies list will be
      <SearchBox onSearch={() => {}} />
      <Filters />
      <RecipesList recipeType={"own"} />
    </div>
  );
};

export default MainPage;
