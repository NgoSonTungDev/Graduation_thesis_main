import mongoose from "mongoose";
import { IPurpose_type } from "../types/purpose_type";

const typeSchema = new mongoose.Schema<IPurpose_type>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Types = mongoose.model("Type", typeSchema);

export default Types;
