import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const genericErrorMessage = "There was an error. Please try again a bit later.";
const showIngredErToast = (message) => {
  toast.error(message,
    { id: "ingredToast" });
}
const showCategErToast = (message) => {
  toast.error(message,
    { id: "categToast" });
}

export const fetchCategories = createAsyncThunk(
  "filters/fetchCategories",
  async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/categories");
    return res.data.data;
  } catch (error) {
    showCategErToast("Failed to load categories");
    //  toast.error("Failed to load categories");
    return thunkAPI.rejectWithValue(error.response?.data?.data?.message || error.message || genericErrorMessage)
  }
  })

export const fetchIngredients = createAsyncThunk(
  "filters/fetchIngredients",
  async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/ingredients");
    return res.data.data;
  } catch (error) {
    showIngredErToast("Failed to load ingredients");
    // toast.error("Failed to load ingredients");
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || genericErrorMessage)
  }
  })

  // Попередній код
//   const instance = axios.create({
//   baseURL: "https://cavabanga-be.onrender.com/api",
// });

// export const genericErrorMessage =
//   "There was an error. Please try again a bit later.";

// export const fetchCategories = generateThunk("filters/fetchCategories", () => {
//   return axios.get("/api/categories");
// });
// export const fetchIngredients = generateThunk(
//   "filters/fetchIngredients",
//   () => {
//     return axios.get("/api/ingredients");
//   }
// );

// function generateThunk(name, requestFunc) {
//   return createAsyncThunk(name, async (arg, thunkAPI) => {
//     try {
//       const response = await requestFunc(arg);
//       return response.data.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || error.message || genericErrorMessage
//       );
//     }
//   });
// }

// export default instance;