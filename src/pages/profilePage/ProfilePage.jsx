import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileNavigation from '../../components/profileNavigation/ProfileNavigation.jsx';
import RecipesList from '../../components/recipesList/RecipesList.jsx';
import LoadMoreBtn from '../../components/loadMoreBtn/LoadMoreBtn.jsx';

import { fetchRecipes, clearRecipes } from '../../redux/recipes/recipesSlice.js';
import { selectRecipes, selectHasMore, selectLoading} from '../../redux/recipes/recipesSelectors.js';

import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const { recipeType } = useParams();
    const dispatch = useDispatch();
    const recipes = useSelector(selectRecipes);
    const loading = useSelector(selectLoading);

    useEffect(() => {
        dispatch(clearRecipes());
        dispatch(fetchRecipes({ type: recipeType}));
    }, [dispatch, recipeType]);


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My profile</h2>
            <ProfileNavigation />
            {loading && <p>Loading...</p>}
            <RecipesList recipes={recipes} recipeType={recipeType} />
           
            <p className={styles.subtitle}>Showing: {recipeType} </p>
        </div>
    );
};

export default ProfilePage;