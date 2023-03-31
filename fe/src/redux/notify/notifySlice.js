import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listNotify: [],
};

const NotifySlice = createSlice({
  name: "Notify",
  initialState,
  reducers: {
    addNotify: (state, { payload }) => {
      state.listNotify = [payload, ...state.listNotify];
    },

    changeListNotify: (state, { payload }) => {
      state.listNotify = payload;
    },
  },
});

export const { addNotify, changeListNotify } = NotifySlice.actions;

export default NotifySlice.reducer;
