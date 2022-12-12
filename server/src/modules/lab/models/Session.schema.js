import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { sessionAssistantSchema } from "./SessionAssistant.schema.js";

export const sessionSchema = new Schema({
  openTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  closeTime: {
    type: Date,
    required: false,
  },
  assistant: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: sessionAssistantSchema,
      require: false,
    },
  ],
});

const Session = mongoose.model("sessions", sessionSchema);

export default Session;
