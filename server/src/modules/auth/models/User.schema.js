import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { RoleInfo } from "../../../constants/roleInfo.js";

export const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  surname: {
    type: String,
    required: [true, "Surname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone:{
    type:String,
    required:[true, "Phone number is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  studentNumber: {
    type: String,
    required: [true, "Student Number is required"],
    unique: true,
  },
  role: {
    type: String,
    enum: [RoleInfo.admin, RoleInfo.assistant, RoleInfo.student],
    default: RoleInfo.student,
  },
  registrationToken: {
    type: Schema.Types.Mixed,
  }
});

const User = mongoose.model("users", UserSchema);

export default User;
