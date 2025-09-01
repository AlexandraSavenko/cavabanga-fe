import { createSlice } from "@reduxjs/toolkit";
import {
  getRecipeList,
  getUserFavourites,
  toggleFavorites,
} from "./operations";

const recipesState = {
  allRecipes: [],
  listOfFavorites: [],
  favoriteRecipes: [],
  page: 1,
  perPage: 12,
  totalItems: 0,
  totalPages: 0,
  currentView: "",
  filters: {},
  title: "",
  loading: false,
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
      // Запит списка рецептів
      .addCase(getRecipeList.pending, (state) => {
        state.loading = true; // починаємо лоадер
        state.error = null;
      })
      .addCase(getRecipeList.fulfilled, (state, action) => {
        state.loading = false; // зупиняємо лоадер
        state.allRecipes = action.payload?.data || [];
        state.page = action.payload?.page || state.page;
        state.totalItems = action.payload?.totalItems || 0;
        state.totalPages = action.payload?.totalPages || 0;
      })
      .addCase(getRecipeList.rejected, (state, action) => {
        state.loading = false; // гарантія вимкнення лоадера при помилці
        state.allRecipes = [];
        state.error = action.error || true;
      })

      // Запит фаворитів користувача
      .addCase(getUserFavourites.pending, (state) => {
        state.loading = true; // починаємо лоадер при завантаженні фаворитів
        state.error = null;
      })
      .addCase(getUserFavourites.fulfilled, (state, action) => {
        state.loading = false; // зупиняємо лоадер після отримання фаворитів
        state.favoriteRecipes = action.payload || [];
      })
      .addCase(getUserFavourites.rejected, (state, action) => {
        state.loading = false; // гарантуємо відключення лоадера при помилці
        state.error = action.error || true;
      })

      // Тоггл фаворитів
      .addCase(toggleFavorites.fulfilled, (state, action) => {
        // Оновлюємо список фаворитів за відповіді бекенду або по id
        const payload = action.payload || {};
        const recipeId = payload.recipeId || payload.id || payload._id || null;
        if (!recipeId) return;

        if (state.favoriteRecipes.some((r) => (r._id || r.id) === recipeId)) {
          state.favoriteRecipes = state.favoriteRecipes.filter(
            (r) => (r._id || r.id) !== recipeId
          );
        } else {
          state.favoriteRecipes.push({ _id: recipeId });
        }
      }),
});

export default recipeSlice.reducer;
export const { setPage } = recipeSlice.actions;