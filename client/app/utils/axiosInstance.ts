import axios from "axios";
import { deleteCookie, getCookie } from "./cookie";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIBASE_URL || "http://localhost:8888/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getCookie("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth-change"));
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
