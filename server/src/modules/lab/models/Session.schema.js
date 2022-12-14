import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
  assistants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sessionAssistants",
      required: false,
    },
  ],
  userSessions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userSessions",
      required: false,
    },
  ],
});

const Session = mongoose.model("sessions", sessionSchema);

export default Session;
