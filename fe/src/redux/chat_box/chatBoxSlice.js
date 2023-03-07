import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  listChat: [],
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
    addMessage: (state, { payload }) => {
      console.log("ajsdhsakj", payload);
      state.listChat = [...state.listChat, payload];
    },
  },
});

export const { openChatBox, closeChatBox, addMessage } = ChatBoxSlice.actions;

export default ChatBoxSlice.reducer;
