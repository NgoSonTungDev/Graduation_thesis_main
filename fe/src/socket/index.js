import { io } from "socket.io-client";
import { addMessage, openChatBox } from "../redux/chat_box/chatBoxSlice";
import { addNotify, trueNotify } from "../redux/notify/notifySlice";
import store from "../redux/store";
import { toastify } from "../utils/common";

const RECONNECTION_ATTEMPTS = 10;
const RECONNECTION_DELAY = 1000;
const RECONNECTION_DELAY_MAX = 5000;

class WebsocketClient {
  constructor() {
    this.io = null;
  }

  initialize() {
    this.io = io("http://localhost:4000", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: RECONNECTION_ATTEMPTS,
      reconnectionDelay: RECONNECTION_DELAY,
      reconnectionDelayMax: RECONNECTION_DELAY_MAX,
    });

    this.listen();
  }

  listen() {
    const dispatch = store.dispatch;
    this.io.on("receive_message", (data) => {
      toastify("info", "Bạn có 1 tin nhắn mới.");      
      dispatch(addMessage(data));
      dispatch(openChatBox());
    });
    this.io.on("receive_notify", (data) => {
      toastify("info", "Bạn có 1 thông báo mới.");
      dispatch(addNotify(data));
      dispatch(trueNotify());
    });
  }

  joinRoom(roomId) {
    this.io.emit("join_room", roomId);
  }

  sendMessage(message) {
    this.io.emit("send_message", message);
  }

  joinRoomNotify(userId) {
    this.io.emit("join_room_notify", userId);
  }

  sendNotify(message) {
    this.io.emit("send_notify", message);
  }

  disconnect() {
    this.io.disconnect();
  }

  io() {
    return this.io;
  }
}

const ws = new WebsocketClient();

export default ws;
