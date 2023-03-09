import { io } from "socket.io-client";
import { addMessage } from "../redux/chat_box/chatBoxSlice";
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
    });
  }

  joinRoom(roomId) {
    this.io.emit("join_room", roomId);
  }

  sendMessage(message) {
    this.io.emit("send_message", message);
  }

  joinRoomNotify(roomId = "63eb395175a1b450e28d9665") {
    this.io.emit("join_room_notify", roomId);
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
