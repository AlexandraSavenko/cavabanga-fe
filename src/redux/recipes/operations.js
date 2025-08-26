import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipeList = createAsyncThunk("api/recires", async (_, thunkAPI) => {
    try {
        const res = await axios.get("/api/recipes");
        console.log(res.data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
} )