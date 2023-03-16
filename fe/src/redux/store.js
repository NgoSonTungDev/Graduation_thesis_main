import { configureStore } from "@reduxjs/toolkit";
import ChatBotReducer from "./chat_bot/chatSlice";
import PlaceReducer from "./place/placeSlice";
import ChatBoxReducer from "./chat_box/chatBoxSlice";

const store = configureStore({
  reducer: {
    ChatBot: ChatBotReducer,
    Place: PlaceReducer,
    ChatBox: ChatBoxReducer,
  },
});

export default store;