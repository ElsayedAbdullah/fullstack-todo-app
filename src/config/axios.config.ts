import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://strapi-todo-app-88hk.onrender.com/api",
});
