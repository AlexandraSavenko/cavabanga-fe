import { createSlice } from "@reduxjs/toolkit";
import { getRecipeList, getUserFavourites, toggleFavourites } from "./operations";

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
  error: null
};
const recipeSlice = createSlice({
  name: "recipes",
  initialState: recipesState,
  reducers: {
    setPage: (state, action) => {
      const newPage = action.payload
      if(newPage >= 1 && newPage <= state.totalPages){
        state.page = newPage;
      }
      },
  },
  extraReducers: (builder) =>
    builder.addCase(getRecipeList.pending, (state) => {
        state.loading = true;
    })
  .addCase(getRecipeList.fulfilled, (state, action) => {
    state.loading = false;
      state.allRecipes = action.payload.data;
      state.page = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    }).addCase(getRecipeList.rejected, (state) => {
        state.loading = false;
        state.error = true;
    }).addCase(getUserFavourites.pending, (state) => {
      state.loading = true;
    }).addCase(getUserFavourites.fulfilled, (state, action) => {
state.favoriteRecipes = action.payload
    }).addCase(toggleFavourites.fulfilled, (state, action) => {
      const { recipeId, toDo } = action.payload;
state.listOfFavorites
    })
});

export default recipeSlice.reducer;
export const { setPage } = recipeSlice.actions
