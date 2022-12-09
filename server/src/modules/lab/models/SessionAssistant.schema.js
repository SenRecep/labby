import mongoose from "mongoose";
import {UserSchema} from "../../auth/models/User.schema.js";
const Schema = mongoose.Schema;


export const sessionAssistantSchema = new Schema({
    userId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserSchema
        }
    ],
    changeTime:{
        type:Date,
        required:true
    },
});

const sessionAssistant = mongoose.model("sessionAssistant", sessionAssistantSchema);

export default sessionAssistant