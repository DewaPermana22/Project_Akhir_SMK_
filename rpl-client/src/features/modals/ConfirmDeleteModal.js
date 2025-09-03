import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openConfirmDeleteModal: false,
  title: "Konfirmasi",
  message: "Apakah Anda yakin ingin menghapus data ini?",
  data: null,
  loading: false,
};

const modalConfirmdeleteSlice = createSlice({
  name: "modal_confirm_delete",
  initialState,
  reducers: {
    openModalConfirmDelete: (state, action) => {
      state.openConfirmDeleteModal = true;
      if (action.payload) {
        state.title = action.payload.title || state.title;
        state.message = action.payload.message || state.message;
        state.data = action.payload.data || null;
      }
    },
    closeModalConfirmDelete: (state) => {
      state.openConfirmDeleteModal = false;
      state.loading = false;
      state.data = null;
    },
    toggleModalConfirmDelete: (state) => {
      state.openConfirmDeleteModal = !state.openConfirmDeleteModal;
    },
    setLoadingConfirmDelete: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  openModalConfirmDelete,
  closeModalConfirmDelete,
  toggleModalConfirmDelete,
  setLoadingConfirmDelete,
} = modalConfirmdeleteSlice.actions;

export default modalConfirmdeleteSlice.reducer;
