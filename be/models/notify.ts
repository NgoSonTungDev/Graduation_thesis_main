import { INotify } from "./../types/notify";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema<INotify>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  postId: {
    type: String,
    required: false,
  },
  placeId: {
    type: String,
    required: false,
  },
});

const Notifications = mongoose.model("Notification", notificationSchema);

export default Notifications;
