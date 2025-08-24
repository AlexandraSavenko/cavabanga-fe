import React from 'react'
import css from "./MainPage.module.css"

import Logo from '../../components/logo/Logo'
import RecipesList from '../../components/recipesList/RecipesList'
const MainPage = () => {
  return (
    <div className={css.wrap}>
        this is where recipies list will be
{/* <RecipesList recipeType={"own"}/> */}
    </div>
  )
}

export default MainPage
