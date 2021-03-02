import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    opened: false,
    body: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.opened = true;
      state.body = action.payload;
    },
    closeModal: (state) => {
      state.opened = false;
      state.body = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModalState = (state) => state.modal;


export default modalSlice.reducer;