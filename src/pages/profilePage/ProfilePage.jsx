import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileNavigation from '../../components/profileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/recipesList/RecipesList.jsx';
import LoadMoreBtn from '../../components/loadMoreBtn/LoadMoreBtn.jsx';

import styles from './ProfilePage.module.css';
import { getRecipeList } from '../../redux/recipes/operations.js';
import { selectAllRecipes } from '../../redux/recipes/selectors.js';


const ProfilePage = () => {
    const { recipeType } = useParams();
    const dispatch = useDispatch();
    const recipes = useSelector(selectAllRecipes);

  useEffect(() => {
dispatch(getRecipeList({type: "own", page: 1, perPage: 12}))
  }, [dispatch])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My profile</h2>
            <ProfileNavigation />
            <RecipesList allRecipes={recipes} recipeType={recipeType} />
           
            <p className={styles.subtitle}>Showing: {recipeType} </p>
        </div>
    );
};

export default ProfilePage;