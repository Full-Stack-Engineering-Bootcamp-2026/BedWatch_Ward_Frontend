import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

export const signup = (data: any) => API.post("/auth/signup", data);
export const login = (data: any) => API.post("/auth/login", data);
