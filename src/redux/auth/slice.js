import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operations";
import { ErrorMessage } from "formik";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
      savedRecipes: []
    },
    token: null,
    isLoggedIn: false,
    error: false,
    // ErrorMessage: ""
  },
  // reducers: {},
  extraReducers: builder =>
    builder
      // .addCase(register.pending, (state, action) => {} OR handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.user.savedRecipes = action.payload.user.savedRecipes;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      // .addCase(register.rejected, (state, action) => { } OR handleError)
      // .addCase(login.fulfilled, (state, action) => {
      //   state.isLoggedIn = true;
      //   state.user = action.payload.user;
      //   state.token = action.payload.token;
      // })
//       .addCase(login.rejected, handleError)
//       .addCase(logout.pending, handlePending)
//       .addCase(logout.fulfilled, (state) => {
//         state.isLoggedIn = false;
//         state.user = {
//           name: null,
//           email: null,
//         };
//         state.token = null;
//       })
//   }
});

  export default authSlice.reducer;