import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token_berita : "",
}

const TokenBeritaSlice = createSlice({
  name: "token_berita",
  initialState,
  reducers: {
    setTokenBerita: (state, action) => {
        state.token_berita = action.payload;
    },
    clearTokenBerita: () => initialState,
  },
});

export const { setTokenBerita, clearTokenBerita } = TokenBeritaSlice.actions;
export default TokenBeritaSlice.reducer;