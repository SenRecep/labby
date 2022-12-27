import SessionAssistant from "../models/SessionAssistant.schema.js";
import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import sessionQueryRepository from "./sessionQuery.repository.js";
import HttpStatusCodes from "http-status-codes";

class sessionAssistantRepository {
  getAll(userId) {
    return SessionAssistant.find({ user: userId }).populate("user");
  }
  async getAssistant(){
    const found = await sessionQueryRepository.getThisDate();
    const getAssistant = await SessionAssistant.findOne({session:found.id,changeTime: null}).populate({
      path: "user",
   }); 
    return getAssistant.user.name + " " + getAssistant.user.surname;
  }
  getById(id) {
    return User.findById(id);
  }
  async postAssistant(userId) {
    const found = await sessionQueryRepository.getThisDate();
    const updateAssistant = await SessionAssistant.findOneAndUpdate(
      { changeTime: null, session: found.id },
      { changeTime: Date.now() },
      { new: true }
    );
    const sessionAssistant = await SessionAssistant.create({
      user: userId,
      session: found.id,
    });
    const update = await Session.findByIdAndUpdate(
      found._id,
      {
        $push: {
          assistants: sessionAssistant._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return await SessionAssistant
      .findById(sessionAssistant._id)
      .populate("session");
  }
}

const instance = new sessionAssistantRepository();

export default instance;

export { instance };
