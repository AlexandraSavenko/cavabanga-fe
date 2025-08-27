import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import authReducer from "./auth/slice";
import recipesReducer from "./recipes/slice";
import filtersReducer from "./filters/slice";

const persistAuthConfig = {
  key: "auth",
  storage
}
const persistFiltersConfig = {
  key: "filters",
  storage
}
const persistRecipesConfig = {
  key: "recipes",
  storage
}
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
const persistedFiltersReducer = persistReducer(persistFiltersConfig, filtersReducer);
const persistedRecipesReducer = persistReducer(persistRecipesConfig, recipesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    filters: persistedFiltersReducer,
    recipes: persistedRecipesReducer,
  },
});

export const persistor = persistStore(store);
