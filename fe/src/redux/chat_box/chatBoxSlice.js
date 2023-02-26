import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const ChatBoxSlice = createSlice({
  name: "ChatBox",
  initialState,
  reducers: {
    openChatBox: (state) => {
      state.open = true;
    },
    closeChatBox: (state) => {
      state.open = false;
    },
  },
});

export const { openChatBox, closeChatBox } = ChatBoxSlice.actions;

export default ChatBoxSlice.reducer;
