import { createSlice } from "@reduxjs/toolkit";

const recipesState = {
    allRecipes: [],
    favRecipes: [],
    ownRecipes: []
}
const recipeSlice = createSlice({
    name: "recipes",
    initialState: {
recipesState
    },
    extraReducers: builder => builder.addCase()
})

export default recipeSlice.reducer;