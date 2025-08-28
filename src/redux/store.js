import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/slice";
import recipesReducer from "./recipes/slice";
import filtersReducer from "./filters/slice";
import favoritesSlice from "./recipes/favoritesSlice";

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
// const persistFiltersConfig = {
//   key: "filters",
//   storage
// }
// const persistRecipesConfig = {
//   key: "recipes",
//   storage
// }
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
// const persistedFiltersReducer = persistReducer(persistFiltersConfig, filtersReducer);
// const persistedRecipesReducer = persistReducer(persistRecipesConfig, recipesReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    filters: filtersReducer,
    recipes: recipesReducer,
    favorites: favoritesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
