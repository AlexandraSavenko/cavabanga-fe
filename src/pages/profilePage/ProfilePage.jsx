import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileNavigation from '../../components/profileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/recipesList/RecipesList.jsx';
import LoadMoreBtn from '../../components/loadMoreBtn/LoadMoreBtn.jsx';

import styles from './ProfilePage.module.css';
import { getRecipeList, getUserFavourites } from '../../redux/recipes/operations.js';
import { selectAllRecipes, selectUserFavourites } from '../../redux/recipes/selectors.js';
import { resetFilters } from '../../redux/filters/slice.js';
import FilterCount from '../../components/filterCount/FilterCount.jsx';


const ProfilePage = () => {
    const { recipeType } = useParams();
    const dispatch = useDispatch();
    const recipes = useSelector(selectAllRecipes);
    const favRecipes = useSelector(selectUserFavourites);


  useEffect(() => {
    dispatch(resetFilters())
    recipeType === "own" ? 
dispatch(getRecipeList({type: recipeType, page: 1, perPage: 12})) :
dispatch(getUserFavourites())
  }, [dispatch, recipeType])
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My profile</h2>
            <ProfileNavigation />
            <FilterCount recipeNumber={recipeType === "own" ? recipes.length : favRecipes.length}/>
            <RecipesList allRecipes={recipeType === "own" ? recipes : favRecipes} recipeType={recipeType} />
        </div>
    );
};

export default ProfilePage;