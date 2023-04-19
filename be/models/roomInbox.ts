import mongoose from "mongoose";
const Schema = mongoose.Schema;

const roomSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    listInbox: [{ type: Object, required: false, default: [] }],
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Rooms = mongoose.model("Room", roomSchema);

export default Rooms;
