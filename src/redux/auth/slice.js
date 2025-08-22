import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      name: null,
      email: null,
      savedRecipes: [],
      ownRecipes: []
    },
    token: null,
    isLoggedIn: false,
    error: false,
    // errorMessage: ""
  },
  // reducers: {},
  extraReducers: builder =>
    builder
      // .addCase(register.pending, (state, action) => {} OR handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user.id = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.savedRecipes = action.payload.user.savedRecipes;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = false;
      })
      // .addCase(register.rejected, (state, action) => { } OR handleError)
      .addCase(login.fulfilled, (state, action) => {
        state.user.id = action.payload.user._id;
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.savedRecipes = action.payload.user.savedRecipes;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = false;
      })
//       .addCase(login.rejected, handleError)
//       .addCase(logout.pending, handlePending)
      // .addCase(logout.fulfilled, (state) => {
      //   state.isLoggedIn = false;
      //   state.user = {
      //     name: null,
      //     email: null,
      //   };
      //   state.token = null;
      // })
      // .addCase(login.rejected, handleError)

});

  export default authSlice.reducer;