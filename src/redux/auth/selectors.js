export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthError = (state) => state.auth.isAuthError;
export const selectIsLoading = (state) => state.auth.isLoading;