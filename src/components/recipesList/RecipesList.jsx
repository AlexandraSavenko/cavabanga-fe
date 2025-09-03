import { useRef } from 'react';
import RecipeCard from '../recipeCard/RecipeCard.jsx';
import Scroll from '../Scroll/Scroll.jsx';
import style from './RecipesList.module.css';

const RecipesList = ({ allRecipes, recipeType }) => {
  const listRef = useRef(null); // посилання на контейнер для скролу
  if (!Array.isArray(allRecipes)) {
    return <p>Something went wrong</p>;
  }
  return (
    <div ref={listRef} className={style.container}>
      <ul className={style.recipesList}>
        {allRecipes.map(recipe => {
          return (
            <li className={style.item} key={recipe._id}>
              <RecipeCard recipe={recipe} recipeType={recipeType} />
            </li>
          );
        })}
      </ul>
      <Scroll containerRef={listRef} />
    </div>
  );
};

export default RecipesList;
