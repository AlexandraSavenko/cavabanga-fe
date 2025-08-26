import { createSelector } from "reselect";

const selectRecipesSlice = (state) => state.recipes;

export const selectRecipes = createSelector(
  [selectRecipesSlice],
  (recipesSlice) => recipesSlice?.items || []
);

export const selectLoading = createSelector(
  [selectRecipesSlice],
  (recipesSlice) => recipesSlice?.loading || false
);

export const selectHasMore = createSelector(
  [selectRecipesSlice],
  (recipesSlice) => recipesSlice?.hasMore || false
);
