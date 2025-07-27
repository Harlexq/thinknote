import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CountryState } from "../states/CountryState";
import { fetchCountries } from "../services/countryService";
import { CountryResponse, Country } from "../models/Country";

const initialState: CountryState = {
  data: null,
  error: null,
  loading: false,
  selectedCountry: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    selectCountry: (state, action: PayloadAction<Country>) => {
      state.selectedCountry = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCountries.fulfilled,
        (state, action: PayloadAction<CountryResponse>) => {
          state.loading = false;
          if (action.payload.status) {
            state.data = action.payload.data;
          } else {
            state.error = action.payload.message;
          }
        }
      )
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          "An error occurred while countries were being withdrawn.";
      });
  },
});

export const { selectCountry } = countrySlice.actions;
export default countrySlice.reducer;
