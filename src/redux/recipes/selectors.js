import { createSelector } from "reselect";

export const selectAllRecipes = state => state.recipes.allRecipes;
export const selectLoading = state => state.recipes.loading;
export const selectError = state => state.recipes.error;
export const selectPage = state => state.recipes.page;
export const selectTotalItems = state => state.recipes.totalItems;
export const selectTotalPages = state => state.recipes.totalPages;
export const selectUserFavourites = state => state.recipes.favoriteRecipes;
export const selectOneRecipe = state => state.recipes.oneRecipe;
export const selectFavRecipesIds = createSelector(
    [selectUserFavourites], (userFavorites) =>  (userFavorites ?? []).map(recipe => recipe._id)
)
export const selectOwnPage = state => state.recipes.ownPage;
export const selectOwnRecipes = state => state.recipes.ownRecipes;
export const selectTotalOwnItems = state => state.recipes.totalOwnItems;