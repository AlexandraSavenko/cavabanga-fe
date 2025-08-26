import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipeList = createAsyncThunk("api/recires", async (page, thunkAPI) => {
    try {
        const res = await axios.get(`/api/recipes/?page=${page}&limit=12`);
        console.log(res.data)
        return res.data.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
} )