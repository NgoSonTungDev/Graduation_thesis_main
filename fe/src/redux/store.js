import { configureStore } from "@reduxjs/toolkit";
import ChatBotReducer from "./chat_bot/chatSlice";
import PlaceReducer from "./place/placeSlice";
import ChatBoxReducer from "./chat_box/chatBoxSlice";
import notifySlice from "./notify/notifySlice";

const store = configureStore({
  reducer: {
    ChatBot: ChatBotReducer,
    Place: PlaceReducer,
    ChatBox: ChatBoxReducer,
    Notify: notifySlice,
  },
});

export default store;
