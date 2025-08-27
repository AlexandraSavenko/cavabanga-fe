import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipeList = createAsyncThunk("api/recires", async (params, thunkAPI) => {
    try {
        const {type, page, perPage, filters, title} = params;
        const query = new URLSearchParams({
            page: page.toString(),
            perPage: perPage.toString(),
            ...(title ? {title} : {}),
            ...filters ? filters : {}

        })
        const url = type === "all" ? "/api/recipes" : `/api/recipes/${type}/`
        const res = await axios.get(`${url}?${query.toString()}`);
        return res.data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
} )

export const getUserFavourites = createAsyncThunk("user/getFavourites", async (_, thunkAPI) => {
try {
    const res = await axios.get("api/recipes/favorites");
    return res.data.data;
} catch (error) {
                    return thunkAPI.rejectWithValue(error.message)
}
})

export const deleteFromFavorite = createAsyncThunk("recipes/deleteFromFavourite", async ({ recipeId }, thunkAPI) => {
    try {
        const res = await axios.delete(`api/recipes/favorites/${recipeId}`);
       console.log(res.data)
        return { recipeId, data: res.data };
    } catch (error) {
                return thunkAPI.rejectWithValue(error.message)

    }
})


