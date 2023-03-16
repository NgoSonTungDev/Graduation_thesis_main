import { IOrder } from "./../types/order";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  codeOrder: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: Number,
    required: false,
    default: 1,
  },
  dateTime: {
    type: Number,
    required: true,
  },
  placeId: { type: Schema.Types.ObjectId, ref: "Place" },
  salesAgentId: { type: Schema.Types.ObjectId, ref: "SalesAgent" },
});

const Orders = mongoose.model("Order", orderSchema);

export default Orders;
