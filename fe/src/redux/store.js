import { configureStore } from "@reduxjs/toolkit";
import ChatBoxReducer from "./Chatbot/ChatSlice";

export const Store = configureStore({
  reducer: {
    DataChatBot: ChatBoxReducer,
  },
});
