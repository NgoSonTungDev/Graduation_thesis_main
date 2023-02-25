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
    childTicket: {
      type: Number,
      required: true,
    },
    adultTicket: {
      type: Number,
      required: true,
    },
    numberTickets: {
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
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Places = mongoose.model("Place", placeSchema);

export default Places;
