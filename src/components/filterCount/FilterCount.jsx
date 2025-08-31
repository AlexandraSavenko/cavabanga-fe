import React from 'react'
import css from "./FilterCount.module.css"

const FilterCount = ({recipeNumber}) => {
  return (
    <div>
      <span className={css.filtersCount}>
                        {recipeNumber}
                        {recipeNumber === 1 ? " recipe" : " recipes"}
                      </span>
    </div>
  )
}

export default FilterCount
