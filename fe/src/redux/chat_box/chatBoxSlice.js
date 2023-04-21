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
      state.open = !state.open;
    },

    closeChatBox: (state) => {
      state.open = false;
    },

    changeListInbox: (state, { payload }) => {
      state.listChat = payload;
    },

    addMessage: (state, { payload }) => {
      state.listChat = [...state.listChat, payload];
    },
  },
});

export const { openChatBox, closeChatBox, addMessage, changeListInbox } =
  ChatBoxSlice.actions;

export default ChatBoxSlice.reducer;
