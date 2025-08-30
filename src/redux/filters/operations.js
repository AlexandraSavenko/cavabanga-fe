import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const genericErrorMessage = "There was an error. Please try again a bit later.";

export const fetchCategories = createAsyncThunk(
  "filters/fetchCategories",
  async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/categories");
    console.log ("at fetchCategories => res.data.data: ",res.data.data)
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.data?.message || error.message || genericErrorMessage)
  }
  })

export const fetchIngredients = createAsyncThunk(
  "filters/fetchIngredients",
  async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/ingredients");
    console.log ("at fetchIngredients => res.data.data: ",res.data.data)
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message || genericErrorMessage)
  }
})