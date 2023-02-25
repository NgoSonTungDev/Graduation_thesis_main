import { configureStore } from "@reduxjs/toolkit";
import ChatBoxReducer from "./Chatbot/ChatSlice";
import PlaceReducer from "./place/placeSlice";

export const Store = configureStore({
  reducer: {
    ChatBot: ChatBoxReducer,
    Place: PlaceReducer,
  },
});
