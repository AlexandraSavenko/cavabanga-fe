import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
}

const handleError = (state, action) => {
  state.isLoading = false;
  state.authError = action.payload;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      name: null,
      email: null,
      savedRecipes: [],
    },
    token: null,
    isLoggedIn: false,
    authError: null,
    isLoading: false
  },
  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
    },
    addToFav: (state, action) => {
      console.log(action.payload)
      state.user.savedRecipes = [...state.user.savedRecipes, action.payload]
    },
    deleteFromFav: (state, action) => {
      state.user.savedRecipes = state.user.savedRecipes.filter(recipeId => recipeId !== action.payload)
    }
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user.id = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.savedRecipes = action.payload.user.savedRecipes;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.authError = null;
      })
      .addCase(register.rejected, handleError)
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.user.id = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.savedRecipes = action.payload.user.savedRecipes;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authError = null;
        state.isLoading = false;
      })
      .addCase(login.rejected, handleError)
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.authError = null;
        state.token = null;
        state.user.id = null;
        state.user.name = null;
        state.user.email = null;
        state.user.savedRecipes = [];
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.token = null;
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user.name = null;
        state.authError = null;
        state.user.id = null;
        state.user.email = null;
        state.user.savedRecipes = [];
      })
});

export default authSlice.reducer;
export const { clearAuthError, addToFav, deleteFromFav } = authSlice.actions;