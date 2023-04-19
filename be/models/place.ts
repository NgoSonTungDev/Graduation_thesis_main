import { IPlace } from "./../types/place";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const placeSchema = new mongoose.Schema<IPlace>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    LastPrice: {
      type: Number,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    closeTime: {
      type: Number,
      required: false,
    },
    openTime: {
      type: Number,
      required: false,
    },
    image: [{ type: String, required: true }],
    favourite: [{ type: String, required: true, default: [] }],
    description: {
      type: String,
      required: false,
    },
    statisticCmt: [{ type: Object, required: true, default: [] }],
  },
  { timestamps: true }
);

const Places = mongoose.model("Place", placeSchema);

export default Places;
