import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenModal: false,
};

const modalSlice = createSlice({
  name: 'modal_auth',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    },
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
    }
  },
});

export const { openModal, closeModal, toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
