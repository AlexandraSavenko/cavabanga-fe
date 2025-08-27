import { createSelector } from "reselect";

export const selectAllRecipes = state => state.recipes.allRecipes;
export const selectPage = state => state.recipes.page;
export const selectTotalItems = state => state.recipes.totalItems;
export const selectTotalPages = state => state.recipes.totalPages;
export const selectUserFavourites = state => state.recipes.favoriteRecipes;
export const selectFavRecipesIds = createSelector(
    [selectUserFavourites], (userFavorites) =>  (userFavorites ?? []).map(recipe => recipe._id)
)