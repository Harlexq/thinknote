import { configureStore } from "@reduxjs/toolkit";
import search from "./slices/searchSlice";
import auth from "./slices/authSlice";
import profile from "./slices/profileSlice";
import country from "./slices/countrySlice";
import language from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    search,
    auth,
    profile,
    country,
    language,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
