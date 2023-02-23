import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ListChat: [
    {
      type: true,
      content:
        "Chào bạn tôi là Matthew. Tôi là trợ lý ảo của MAFLINE. Tôi có thể giúp gì cho bạn.",
      dateTime: Number(new Date()),
    },
  ],
};

const ChatSlice = createSlice({
  name: "ChatBox",
  initialState,
  reducers: {
    AddDataChat: (state, { payload }) => {
      state.ListChat = [...state.ListChat, payload];
    },
    CleanListChat: (state) => {
      state.ListChat = initialState.ListChat;
    },
  },
});

export const { AddDataChat } = ChatSlice.actions;

export default ChatSlice.reducer;
