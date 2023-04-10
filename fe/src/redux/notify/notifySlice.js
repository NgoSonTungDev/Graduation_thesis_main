import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  check: false,
  listNotify: [],
};

const NotifySlice = createSlice({
  name: "Notify",
  initialState,
  reducers: {
    trueNotify: (state) => {
      state.check = true;
    },

    falseNotify: (state) => {
      state.check = false;
    },

    addNotify: (state, { payload }) => {
      state.listNotify = [payload, ...state.listNotify];
    },

    changeListNotify: (state, { payload }) => {
      state.listNotify = payload;
    },
  },
});

export const { addNotify, changeListNotify , trueNotify, falseNotify} = NotifySlice.actions;

export default NotifySlice.reducer;
