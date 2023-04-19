import { IComment } from "./../types/comment";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema<IComment>(
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
    postId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comments = mongoose.model("Comment", commentSchema);

export default Comments;
