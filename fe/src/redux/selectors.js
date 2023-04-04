//Chat bot
export const DataChat = (state) => state.ChatBot.ListChat;

// Place
export const DataPlaceById = (state) => state.Place.placeById;
export const payloadPlace = (state) => state.Place.payload;

//Chat box
export const OpenChatBox = (state) => state.ChatBox.open;
export const listChatBox = (state) => state.ChatBox.listChat;

//Notify
export const listNotify = (state) => state.Notify.listNotify;
export const checkNotify = (state) => state.Notify.check;
