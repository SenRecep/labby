import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sessions",
  },
  entryTime: {
    type: Date,
    required: true,
  },
  exitTime: {
    type: Date,
    required: false,
  },
});

const UserSession = mongoose.model("userSessions", UserSessionSchema);

export default UserSession;
