import { INotify } from "./../types/notify";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema<INotify>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Number,
    required: true,
    default: Number(new Date()),
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Notifications = mongoose.model("Notification", notificationSchema);

export default Notifications;
