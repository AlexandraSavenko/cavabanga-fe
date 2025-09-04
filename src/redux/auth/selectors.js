export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthError = (state) => state.auth.authError;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectFavIds = (state) => state.auth.user.savedRecipes;