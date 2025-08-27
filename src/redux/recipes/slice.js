import { createSlice } from "@reduxjs/toolkit";
import { getRecipeList } from "./operations";

const recipesState = {
  allRecipes: [],
  page: 1,
  perPage: 12,
  totalItems: 0,
  totalPages: 0,
  favRecipes: [],
  ownRecipes: [],
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
export const { setPage } = recipeSlice.actions
