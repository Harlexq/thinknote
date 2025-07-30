import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkType } from "../models/Api";
import { LanguageResponse } from "../models/Language";
import { handleApiError } from "@/app/utils/errorHander";

export const fetchLanguages = createAsyncThunk<
  LanguageResponse,
  void,
  AsyncThunkType
>("/languages", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<LanguageResponse>("/languages");

    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
