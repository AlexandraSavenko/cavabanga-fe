import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchIngredients } from "./operations";

const slice = createSlice({
  name: "filters",
  initialState: {
    searchQuery: "",
    // recipe: "",
    category: "",
    ingredient: "",
    categories: [],
    ingredients: [],
    loading: false,
    error: null,
  },
  reducers: {
    // changeFilter: (state, action) => {
    //   state.recipe = action.payload;
    // },
    changeCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    changeIngredientFilter: (state, action) => {
      state.ingredient = action.payload;
    },
    changeSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.category = "";
      state.ingredient = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slice.reducer;

export const {
  // changeFilter,
  changeCategoryFilter,
  changeIngredientFilter,
  changeSearchQuery,
  resetFilters,
} = slice.actions;
