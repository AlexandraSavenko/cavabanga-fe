import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import authReducer from "./auth/slice";
import recipesReducer from "./recipes/slice";
import filtersReducer from "./filters/slice";

const persistConfig = {
  key: "user",
  storage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    filters: filtersReducer,
    recipes: recipesReducer,
  },
});

export const persistor = persistStore(store);
