import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectToken } from "./selectors";

axios.defaults.baseURL = "https://cavabanga-be.onrender.com/";
// axios.defaults.baseURL = "http://localhost:3000/";

export const register = createAsyncThunk(
  "auth/register",
  async (values, thunkAPI) => {
    try {
      const res = await axios.post("/api/auth/register", values);
      const user = res.data.data;
      const { email, password } = values;
      const auth = await axios.post("/api/auth/login", { email, password });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.data.data.accessToken}`;
      const payload = {
        user,
        token: auth.data.data.accessToken,
      };
      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.data?.message || "Something went wrong. Please try again later.");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const auth = await axios.post("/api/auth/login", values);
      const token = auth.data.data.accessToken;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // const res = await axios.get("/api/users");
      // const payload = {
      //   user: res.data.data,
      //   token,
      // };
      // return payload;
      return token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.data?.message || "Something went wrong. Please try again later.");
    }
  }
);

export const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (_, thunkAPI) => {
    try {
            const res = await axios.get("/api/users");
      return res.data.data;
    } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.data?.message || "Something went wrong. Please try again later.");

    }
  }
)

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = selectToken(state);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    await axios.post("/api/auth/logout");
    axios.defaults.headers.common["Authorization"] = "";
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.data?.message || "Something went wrong. Please try again later.");
  }
});
