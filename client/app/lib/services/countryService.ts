import { createAsyncThunk } from "@reduxjs/toolkit";
import { CountryResponse } from "../models/Country";
import { AsyncThunkType } from "../models/Api";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { handleApiError } from "@/app/utils/errorHander";

export const fetchCountries = createAsyncThunk<
  CountryResponse,
  void,
  AsyncThunkType
>("/countries", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get<CountryResponse>("countries");

    return res.data;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});
