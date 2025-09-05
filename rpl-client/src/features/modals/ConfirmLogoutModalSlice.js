import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    openConfirmLogoutModal: false,
};

const modalConfirmLogoutSlice = createSlice({
  name: 'modal_confirm_logout',
  initialState,
  reducers: {
    openModalConfirmLogout: (state) => {
      state.openConfirmLogoutModal = true;
    },
    closeModalConfirmLogout: (state) => {
      state.openConfirmLogoutModal = false;
    },
    toggleModalConfirmLogout: (state) => {
      state.openConfirmLogoutModal = !state.openConfirmLogoutModal;
    }
  },
});

export const { openModalConfirmLogout, closeModalConfirmLogout, toggleModalConfirmLogout } = modalConfirmLogoutSlice.actions;
export default modalConfirmLogoutSlice.reducer;
