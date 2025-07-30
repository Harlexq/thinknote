import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLanguages } from "../services/languageService";
import { LanguageResponse } from "../models/Language";
import { LanguageState } from "../states/LanguageState";

const initialState: LanguageState = {
  loading: false,
  error: null,
  languages: [],
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLanguages.fulfilled,
        (state, action: PayloadAction<LanguageResponse>) => {
          state.loading = false;
          if (action.payload.status) {
            state.languages = action.payload.data;
          } else {
            state.error = action.payload.message;
          }
          state.error = null;
        }
      )
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Diller çekilirken bir hata oluştu.";
      });
  },
});

export default languageSlice.reducer;
