import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipe,
  getRecipeList,
  getUserFavourites,
  toggleFavorites,
} from "./operations";
import { logout } from "../auth/operations";

const recipesState = {
  allRecipes: [],
  // listOfFavorites: [],
  favoriteRecipes: [],
  page: 1,
  perPage: 12,
  totalItems: 0,
  totalPages: 0,
  currentView: "",
  filters: {},
  title: "",
  loading: false,
  oneRecipe: null,
  // isToggleFavoritesLoading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: recipesState,
  reducers: {
    setPage: (state, action) => {
      const newPage = action.payload;
      if (newPage >= 1 && newPage <= state.totalPages) {
        state.page = newPage;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getRecipeList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecipeList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allRecipes = action.payload.data;
        state.page = action.payload.page;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getRecipeList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.allRecipes = [];
        state.totalItems = 0;
        state.totalPages = 0;
      })
      .addCase(getUserFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserFavourites.fulfilled, (state, action) => {
        state.loading = false; // Зупиняємо лоадер після отримання фаворитів
        state.favoriteRecipes = action.payload;
        state.loading = false;
        state.error = null;
        // state.page = 1;
        // state.totalItems = action.payload.length;
        // state.totalPages = 1;
      })
      .addCase(getUserFavourites.rejected, (state) => {
        state.loading = false; // Гарантія вимкнення лоадера при помилці
        state.error = true;
      })
      .addCase(toggleFavorites.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(toggleFavorites.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        state.loading = false;
        const { recipeId } = action.payload;
        if (state.favoriteRecipes.some((recipe) => recipe._id === recipeId)) {
          state.favoriteRecipes = state.favoriteRecipes.filter(
            (recipe) => recipe._id !== recipeId
          );
        } else {
          state.favoriteRecipes.push({ _id: recipeId });
        }
        // state.totalItems = state.favoriteRecipes.length;
      })
      .addCase(logout.fulfilled, (state) => {
        state.favoriteRecipes = [];
        state.page = 1;
      })
      .addCase(fetchRecipe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        state.loading = false;
        state.oneRecipe = action.payload;
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

export default recipeSlice.reducer;
export const { setPage } = recipeSlice.actions;