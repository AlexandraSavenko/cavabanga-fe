import RecipeCard from '../recipeCard/RecipeCard.jsx';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn.jsx';
import Pagination from '../pagination/Pagination.jsx';
import ModalErrorCommon from '../ModalErrorCommon/ModalErrorCommon.jsx'

import style from './RecipesList.module.css';

const RecipesList = ({ allRecipes, recipeType }) => {
  const handleNoRecModalClosing =()=>{}
  const handelResetFilters = ()=>{}

  if (!Array.isArray(allRecipes)) {
    return <p>Something went wrong</p>
  }
  // Якщо рецептів немає
  if (allRecipes.length === 0) {
    return <p>No recipes available</p>;
  }
  return (
    <div className={style.container}>
      <ul className={style.recipesList}>
        {allRecipes.map(recipe => {
          return <li className={style.item} key={recipe._id}>
            <RecipeCard recipe={recipe} recipeType={recipeType} />
          </li>
        }
        )}
      </ul>
      <Pagination />
      <ModalErrorCommon isopen={allRecipes.length === 0} onClose={handleNoRecModalClosing}>
            <p className={style.modalTitle}>We're sorry! We were not able to find a match.</p>
            <button className={style.modalBtnLogout} type="button" onClick={handelResetFilters}>Log out</button>
          </ModalErrorCommon>
    </div>
  );
};

export default RecipesList;
