import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { selectToken } from "../auth/selectors";
import { toast } from "react-hot-toast";

export const getRecipeList = createAsyncThunk(
  "api/recires",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
  const token = selectToken(state);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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

export const getOwnRecipeList = createAsyncThunk(
  "api/own",
  async (params, thunkAPI) => {
    const state = thunkAPI.getState();
  const token = selectToken(state);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const {page, perPage} = params;
    const res = await axios.get(`/api/recipes/own/?page=${page}&perPage=${perPage}`);
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.data?.message || "Something went wrong. Please try again later.");
  }
  }
) 

export const getUserFavourites = createAsyncThunk(
  "user/getFavourites",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
  const token = selectToken(state);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("api/recipes/favorites");
      return res.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const toggleFavorites = createAsyncThunk(
  "recipes/toggleFavorites",
  async ({ recipeId, toDo }, thunkAPI) => {
        const state = thunkAPI.getState();
  const token = selectToken(state);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = selectToken(state);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
 await axios.post("/api/recipes", formData, {
  headers: { "Content-Type": "multipart/form-data" },
});
      toast.success("The recipe has been successfully added!")
    }
    catch (error) {
    toast.error("Error while creating recipe")
    return thunkAPI.rejectWithValue(error.response?.data?.data?.message);

    }
  }
)

export const fetchRecipe = createAsyncThunk("recipes/fetchOneRecipe", 
  async (id, thunkAPI) => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
return res.data.data
        // setRecipe(data.data || data);
      } catch (error) {
        toast.error("Something went wrong")
    return thunkAPI.rejectWithValue(error.response?.data?.data?.message);
       
    }}
) 