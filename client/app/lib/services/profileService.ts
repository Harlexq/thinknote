import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkType } from "../models/Api";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { handleApiError } from "@/app/utils/errorHander";
import { ProfileResponse } from "../models/Profile";

export const fetchProfile = createAsyncThunk<
  ProfileResponse,
  void,
  AsyncThunkType
>("/auth/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<ProfileResponse>("/auth/profile");

    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
