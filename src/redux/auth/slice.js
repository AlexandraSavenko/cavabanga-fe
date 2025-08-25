import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./operations";

const handlePending = (state) => {
    state.isLoading = true;
}

const handleError = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
}
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      name: null,
      email: null,
      savedRecipes: [],
      // ownRecipes: []
    },
    token: null,
    isLoggedIn: false,
    authError: null,
    isLoading: false
  },
  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
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
        state.authError = null;
      })
      .addCase(register.rejected, handleError)
      .addCase(login.fulfilled, (state, action) => {
        state.user.id = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.savedRecipes = action.payload.user.savedRecipes;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.authError = null;
      })
      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.authError = null;
        state.token = null;
        state.user.id = null;
        state.user.name = null;
        state.user.email = null;
        state.user.savedRecipes = [];
      })
      .addCase(login.rejected, handleError)
});

  export default authSlice.reducer;