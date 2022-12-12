import mongoose from "mongoose";
import User from "../../auth/models/User.schema.js";
import UserSchema from "../../auth/models/User.schema.js";
const Schema = mongoose.Schema;


export const sessionAssistantSchema = new Schema({
    user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ,
    changeTime:{
        type:Date,
       default:Date.now,
        required:true
    },
});

const sessionAssistant = mongoose.model("sessionAssistant", sessionAssistantSchema);

export default sessionAssistant