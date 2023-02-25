import mongoose from "mongoose";

const autoReplySchema = new mongoose.Schema<{
  question: String;
  content: String;
}>({
  question: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const AutoReps = mongoose.model("AutoRep", autoReplySchema);

export default AutoReps;
