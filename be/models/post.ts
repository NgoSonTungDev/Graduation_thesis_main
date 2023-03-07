import { IPost } from "./../types/post";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new mongoose.Schema<IPost>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public: {
    type: Boolean,
    required: false,
    default: false,
  },
  like: [{ type: String, required: false, default: [] }],
  rating: {
    type: Number,
    required: true,
  },
  placeId: { type: Schema.Types.ObjectId, ref: "Place" },
});

const Posts = mongoose.model("Post", postSchema);

export default Posts;
