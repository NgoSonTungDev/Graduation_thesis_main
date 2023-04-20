import { createSlice } from "@reduxjs/toolkit";
import { getUserDataLocalStorage } from "../../utils/localstorage";

const userIdStorage = getUserDataLocalStorage();

const initialState = {
  user: userIdStorage ? userIdStorage : null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
