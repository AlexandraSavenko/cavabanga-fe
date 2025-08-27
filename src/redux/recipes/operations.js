import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipeList = createAsyncThunk("api/recires", async (params, thunkAPI) => {
    try {
        const {page, perPage, filters, title} = params;
        const query = new URLSearchParams({
            page: page.toString(),
            perPage: perPage.toString(),
            ...(title ? {title} : {}),
            ...filters ? filters : {}

        })
        const res = await axios.get(`/api/recipes/?${query.toString()}`);
        return res.data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
} )