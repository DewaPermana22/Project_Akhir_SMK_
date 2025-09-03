import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openConfirmModal: false,
};

const modalConfirmSlice = createSlice({
  name: 'modal_confirm',
  initialState,
  reducers: {
    openModalConfirm: (state) => {
      state.openConfirmModal = true;
    },
    closeModalConfirm: (state) => {
      state.openConfirmModal = false;
    },
    toggleModalConfirm: (state) => {
      state.openConfirmModal = !state.openConfirmModal;
    }
  },
});

export const { openModalConfirm, closeModalConfirm, toggleModalConfirm } = modalConfirmSlice.actions;
export default modalConfirmSlice.reducer;
