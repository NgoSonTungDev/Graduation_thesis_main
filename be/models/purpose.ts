import mongoose from "mongoose";
import { IPurpose_type } from "../types/purpose_type";

const purposeSchema = new mongoose.Schema<IPurpose_type>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Purposes = mongoose.model("Purpose", purposeSchema);

export default Purposes;
