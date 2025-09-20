import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  debounceSearchTerm: "",
};

const SearchBeritaSlice = createSlice({
  name: "searchBerita",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setDebounceSearch: (state, action) => {
      state.debounceSearchTerm = action.payload;
    },
    clearSearchState: () => {
      initialState;
    },
  },
});

export const {setSearchTerm, setDebounceSearch, clearSearchState} = SearchBeritaSlice.actions
export default SearchBeritaSlice.reducer
