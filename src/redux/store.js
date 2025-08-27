import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import recipesReducer from "./recipes/slice";
import filtersReducer from "./filters/slice";;
import filtersReducer from "./filters/slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    recipes: recipesReducer,
  },
});
