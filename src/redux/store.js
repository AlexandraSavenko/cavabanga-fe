import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import favoritesReducer from "./recipes/favoritesSlice";
import recipesReducer from "./recipes/recipesSlice"; // 👈 додай це

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoritesReducer,
    recipes: recipesReducer, 
  },
});
