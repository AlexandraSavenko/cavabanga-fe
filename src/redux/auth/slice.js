import { createSlice } from "@reduxjs/toolkit";
import { register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null
    },
    token: null,
    isLoggedIn: false,
    error: false
  },
  extraReducers: builder => builder.addCase(register.fulfilled, (state, action) => {
    state.user = action.payload.user;
  })
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(register.pending, handlePending)
//       .addCase(register.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
//       .addCase(register.rejected, handleError)
//       .addCase(login.pending, handlePending)
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//       })
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