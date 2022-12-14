import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const sessionAssistantSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sessions",
  },
  changeTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const sessionAssistant = mongoose.model(
  "sessionAssistants",
  sessionAssistantSchema
);

export default sessionAssistant;
