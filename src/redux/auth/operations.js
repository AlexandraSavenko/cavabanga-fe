import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "http://localhost:3000/";

export const register = createAsyncThunk("auth/register", async (values) => {
    console.log(values);
    const res = await axios.post('http://localhost:3000/api/auth/register', values)
    console.log(res.data);
    return res.data;
})