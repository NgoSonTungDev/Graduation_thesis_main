import { IPayment } from "./../types/payment";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    dateTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payments = mongoose.model("Payment", paymentSchema);

export default Payments;
