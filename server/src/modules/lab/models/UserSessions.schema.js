import mongoose from "mongoose";
import {UserSchema} from "../../auth/models/User.schema.js";
const Schema = mongoose.Schema;
import {sessionSchema} from "./Session.schema.js";


const UserSessionSchema = new Schema({
    userId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserSchema
        }
    ],
    sessionId:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: sessionSchema
        }
    ],
    entryTime:{
        type:Date,
        required:true
    },
    exitTime:{
        type:Date,
        required:true
    }
});

const UserSession = mongoose.model("userSessions", UserSessionSchema);

export default UserSession;