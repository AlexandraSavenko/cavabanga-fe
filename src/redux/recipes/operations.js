import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipeList = createAsyncThunk(
  "api/recires",
  async (params, thunkAPI) => {
    try {
      const { type, page, perPage, ingredient, category, name } = params;
      const query = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        ...(name && { name }),
        ...(ingredient && {ingredient}),
        ...(category && {category}),
      });
      const url = type === "all" ? "/api/recipes" : `/api/recipes/own/`;
      const res = await axios.get(`${url}?${query}`);

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.data?.message || "Something went wrong. Please try again later.");
    }
  }
);

export const getUserFavourites = createAsyncThunk(
  "user/getFavourites",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("api/recipes/favorites");
      return res.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const deleteFromFavorite = createAsyncThunk("recipes/deleteFromFavourite", async ({ recipeId }, thunkAPI) => {
//     try {
//         const res = await axios.delete(`api/recipes/favorites/${recipeId}`);
//        console.log(res.data)
//         return { recipeId, data: res.data };
//     } catch (error) {
//                 return thunkAPI.rejectWithValue(error.message)

//     }
// })

export const toggleFavorites = createAsyncThunk(
  "recipes/toggleFavorites",
  async ({ recipeId, toDo }, thunkAPI) => {
    try {
      const res =
        toDo === "add"
          ? await axios.post(`api/recipes/favorites/${recipeId}`)
          : await axios.delete(`api/recipes/favorites/${recipeId}`);
      return { recipeId, data: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
