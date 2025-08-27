import axios from "axios";

const instance = axios.create({
  baseURL: "https://cavabanga-be.onrender.com",
});

export default instance;
