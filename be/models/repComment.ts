import { IRepComment } from "./../types/comment";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const repCommentSchema = new mongoose.Schema<IRepComment>(
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
    like: [{ type: String, required: false, default: [] }],
    commentId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RepComments = mongoose.model("RepComment", repCommentSchema);

export default RepComments;
