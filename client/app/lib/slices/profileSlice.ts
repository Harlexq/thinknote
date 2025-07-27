import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfile } from "../services/profileService";
import { ProfileState } from "../states/ProfileState";
import { ProfileResponse } from "../models/Profile";

const initialState: ProfileState = {
  loading: false,
  error: null,
  user: null,
};

const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<ProfileResponse>) => {
          state.loading = false;
          if (action.payload.status) {
            state.user = action.payload.data;
          } else {
            state.error = action.payload.message;
          }
          state.error = null;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          "An error occurred while retrieving profile information.";
      });
  },
});

export default profileSlice.reducer;
