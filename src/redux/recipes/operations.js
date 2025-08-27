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

