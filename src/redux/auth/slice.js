import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, getUserData } from "./operations";

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
      // ownRecipes: []
    },
    token: null,
    isLoggedIn: false,
    authError: null,
    isLoading: false
  },
  reducers: {
    clearAuthError: (state) => {
      console.log("executing clearAuthError")
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
        state.isLoading = false;
        state.authError = null;
      })
      .addCase(register.rejected, handleError)
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        // state.user.id = action.payload.user._id;
        // state.user.name = action.payload.user.name;
        // state.user.email = action.payload.user.email;
        // state.user.savedRecipes = action.payload.user.savedRecipes;
        // state.token = action.payload.token;
        // state.isLoggedIn = true;
        // state.authError = null;
        // state.isLoading = false;
      }).addCase(getUserData.fulfilled, (state, action) => {
        console.log(action.payload)
        state.user.id = action.payload._id;
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.savedRecipes = action.payload.savedRecipes;
        state.isLoggedIn = true;
        state.authError = null;
        state.isLoading = false;
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
        state.isLoading = false;
        localStorage.removeItem("token")
      })
      .addCase(login.rejected, handleError)
});

export default authSlice.reducer;
export const { clearAuthError } = authSlice.actions;