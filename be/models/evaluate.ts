import { IEValuate } from "./../types/evaluate";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const evaluateSchema = new mongoose.Schema<IEValuate>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    placeId: { type: Schema.Types.ObjectId, ref: "Place" },
  },
  {
    timestamps: true,
  }
);

const Evaluates = mongoose.model("Evaluate", evaluateSchema);

export default Evaluates;
