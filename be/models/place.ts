import { IPlace } from "./../types/place";
import mongoose from "mongoose";

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
    geographicalLocation: {
      type: String,
      required: true,
    },
    price: {
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
      default: 5,
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
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Places = mongoose.model("Place", placeSchema);

export default Places;
