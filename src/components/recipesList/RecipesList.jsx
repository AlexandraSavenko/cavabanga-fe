import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectPage } from '../../redux/recipes/selectors';

import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';
import Pagination from '../pagination/Pagination.jsx';

import style from './RecipesList.module.css';

const RecipesList = ({ allRecipes, recipeType }) => {
  const currentPage = useSelector(selectPage);
  const listRef = useRef(null);

  // автоскрол при зміні сторінки
  useEffect(() => {
    if (listRef.current) {
      const y =
        listRef.current.getBoundingClientRect().top + window.scrollY - 150;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [currentPage]);

  if (!Array.isArray(allRecipes)) {
    return <p>Something went wrong</p>;
  }
  // Якщо рецептів немає
  if (allRecipes.length === 0) {
    return <p>No recipes available</p>;
  }

  const scrollToTop = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  return (
    <div ref={listRef} className={style.container}>
      <ul className={style.list}>
        {allRecipes.map(recipe => {
          return (
            <li key={recipe._id}>
              <RecipeCard recipe={recipe} recipeType={recipeType} />
            </li>
          );
        })}
      </ul>
      <Pagination />
      {/* кнопки скролу */}
      <button
        className={style.scrollBtn}
        onClick={scrollToTop}
        style={{ top: '70%', right: '40px' }}
      >
        ⬆
      </button>
      <button
        className={style.scrollBtn}
        onClick={scrollToBottom}
        style={{ top: '80%', right: '40px' }}
      >
        ⬇
      </button>
    </div>
  );
};

export default RecipesList;
