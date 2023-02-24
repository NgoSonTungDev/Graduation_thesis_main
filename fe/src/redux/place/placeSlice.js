import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  placeById: {},
};

const PlaceSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    objectByIdPlace: (state, { payload }) => {
      state.placeById = payload;
    },
    clearByIdPlace: (state, { payload }) => {
      state.placeById = {};
    },
  },
});

export const { objectByIdPlace, clearByIdPlace } = PlaceSlice.actions;

export default PlaceSlice.reducer;
