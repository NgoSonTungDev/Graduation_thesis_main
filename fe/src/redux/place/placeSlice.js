import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listImage: [],
  placeById: {},
  payload: {
    pageNumber: 1,
    limit: 6,
    placeName: "",
    location: "",
    type: "",
    variability: "",
    purpose: "",
  },
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
    changePayload: (state, { payload }) => {
      state.payload = payload;
    },
    resetPayload: (state, { payload }) => {
      state.payload = initialState.payload;
    },
    setListImage: (state, { payload }) => {
      state.listImage = payload;
    },
  },
});

export const {
  objectByIdPlace,
  clearByIdPlace,
  changePayload,
  resetPayload,
  setListImage,
} = PlaceSlice.actions;

export default PlaceSlice.reducer;
