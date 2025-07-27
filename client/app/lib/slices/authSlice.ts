import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchForgotPassword,
  fetchLogin,
  fetchLogout,
  fetchRegister,
} from "../services/authService";
import { AuthResponse } from "../models/Auth";
import { AuthState } from "../states/AuthState";
import { deleteCookie, setCookie } from "@/app/utils/cookie";
import { ApiDefaultResponse } from "../models/Api";

const initialState: AuthState = {
  loading: false,
  error: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuth = false;
      })
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          if (action.payload.status) {
            const data = action.payload.data;
            setCookie("accessToken", data.accessToken, {
              httpOnly: true,
              maxAge: data.maxAge,
              secure: true,
            });
            setCookie("refreshToken", data.refreshToken, {
              httpOnly: true,
              maxAge: data.maxAge,
              secure: true,
            });
            state.isAuth = true;
          } else {
            state.error = action.payload.message;
            state.isAuth = false;
          }
          state.error = null;
        }
      )
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.error = action.payload || "An error occurred while logging in.";
      })

      .addCase(fetchRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuth = false;
      })
      .addCase(
        fetchRegister.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          if (action.payload.status) {
            const data = action.payload.data;
            setCookie("accessToken", data.accessToken, {
              httpOnly: true,
              maxAge: data.maxAge,
              secure: true,
            });
            setCookie("refreshToken", data.refreshToken, {
              httpOnly: true,
              maxAge: data.maxAge,
              secure: true,
            });
            state.isAuth = true;
          } else {
            state.error = action.payload.message;
            state.isAuth = false;
          }
          state.error = null;
        }
      )
      .addCase(fetchRegister.rejected, (state, action) => {
        state.loading = false;
        state.isAuth = false;
        state.error =
          action.payload || "An error occurred during registration.";
      })

      .addCase(fetchForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchForgotPassword.fulfilled,
        (state, action: PayloadAction<ApiDefaultResponse>) => {
          state.loading = false;
          if (!action.payload.status) {
            state.error = action.payload.message;
          }
          state.error = null;
        }
      )
      .addCase(fetchForgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          "An error occurred while sending the password reset email.";
      })

      .addCase(fetchLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.loading = false;
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        state.error = null;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while logging out.";
      });
  },
});

export default authSlice.reducer;
