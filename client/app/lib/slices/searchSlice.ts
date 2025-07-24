import { createSlice } from "@reduxjs/toolkit";
import { SearchState } from "../states/SearchState";

const initialState: SearchState = {
  sought: "",
  isOpenSearch: false,
};

const searchSlice = createSlice({
  name: "sarch",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isOpenSearch = true;
    },
    closeSearch: (state) => {
      state.isOpenSearch = false;
    },
  },
});

export const { closeSearch, openSearch } = searchSlice.actions;
export default searchSlice.reducer;
