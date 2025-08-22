import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// axios.defaults.baseURL = "???";

export const register = createAsyncThunk("auth/register", async (values) => {
    const res = await axios.post('http://localhost:3000/api/auth/register', values);
    // console.log("user = res.data.data:", res.data.data);
    const user = res.data.data;
    const { email, password } = values;
    const auth = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    const resData = {
        user,
        token: auth.data.data.accessToken
    }
    // console.log(resData);
    return resData;
})