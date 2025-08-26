import { createSlice } from "@reduxjs/toolkit";
import { getRecipeList } from "./operations";

const recipesState = {
  allRecipes: [],
  page: 1,
  totalItems: 0,
  totalPages: 0,
  favRecipes: [],
  ownRecipes: [],
  loading: false,
  error: false
};
const recipeSlice = createSlice({
  name: "recipes",
  initialState: recipesState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getRecipeList.pending, (state) => {
        state.loading = true;
    })
  .addCase(getRecipeList.fulfilled, (state, action) => {
    state.loading = false;
      state.allRecipes = action.payload.dishes;
      state.page = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    }).addCase(getRecipeList.rejected, (state) => {
        state.loading = false;
        state.error = true;
    })
});

export default recipeSlice.reducer;
