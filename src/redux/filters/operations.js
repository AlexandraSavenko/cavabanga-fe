import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://cavabanga-be.onrender.com/api",
});

export const genericErrorMessage =
  "There was an error. Please try again a bit later.";

export const fetchCategories = generateThunk("filters/fetchCategories", () => {
  return axios.get("/api/categories");
});
export const fetchIngredients = generateThunk(
  "filters/fetchIngredients",
  () => {
    return axios.get("/api/ingredients");
  }
);

function generateThunk(name, requestFunc) {
  return createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const response = await requestFunc(arg);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || genericErrorMessage
      );
    }
  });
}

export default instance;
