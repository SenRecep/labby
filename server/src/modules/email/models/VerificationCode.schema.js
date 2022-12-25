import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const VerificationCodeSchema = new Schema({
  code: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  expiredTime:{
    type: Date
  },
  isUsed:{
    type: Boolean
  }
});

const VerificationCode = mongoose.model("verificationCode", UserSchema);

export default VerificationCode;
