import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {roles} from "../../../constants/roleInfo.js";

let UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  surname: {
    type: String,
    required: [true, "Surname is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  studentNumber: {
    type: Number,
    required: [true, "Student Number is required"],
    unique:true
  },
  role:{
    type:String,
        enum:[roles.admin,roles.assistant,roles.student],
        default:roles.student
  }
});

const User = mongoose.model("user", UserSchema);

export default User;
