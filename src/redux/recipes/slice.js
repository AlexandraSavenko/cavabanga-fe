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
    }
})

export default recipeSlice.reducer;