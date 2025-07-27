import { LoginSchema } from "@/app/schema/loginSchema";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiDefaultResponse, AsyncThunkType } from "../models/Api";
import { AuthResponse } from "../models/Auth";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { handleApiError } from "@/app/utils/errorHander";
import { RegisterSchema } from "@/app/schema/registerSchema";
import { ForgotPasswordSchema } from "@/app/schema/forgotPasswordSchema";

export const fetchLogin = createAsyncThunk<
  AuthResponse,
  LoginSchema,
  AsyncThunkType
>("/auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<AuthResponse>("/auth/login", data);

    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchRegister = createAsyncThunk<
  AuthResponse,
  RegisterSchema,
  AsyncThunkType
>("/auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<AuthResponse>("/auth/register", data);

    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchLogout = createAsyncThunk<
  ApiDefaultResponse,
  void,
  AsyncThunkType
>("/auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<ApiDefaultResponse>("/auth/logout");

    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchForgotPassword = createAsyncThunk<
  ApiDefaultResponse,
  ForgotPasswordSchema,
  AsyncThunkType
>("/auth/forgot-password", async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post<ApiDefaultResponse>(
      "/auth/forgot-password",
      data
    );

    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
