import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPopUpOpen: false,
  absenType: null,
};

const PopUpKameraSlice = createSlice({
  initialState: initialState,
  name: "popupKamera",
  reducers: {
    openPopUpKamera: (state, action) => {
      state.isPopUpOpen = true;
      state.absenType = action.payload;
    },
    closePopUpKamera: (state) => {
      state.isPopUpOpen = false;
      state.absenType = null;
    },
  },
});

export const { openPopUpKamera, closePopUpKamera } = PopUpKameraSlice.actions;
export default PopUpKameraSlice.reducer;