import SessionAssistant from "../models/SessionAssistant.schema.js";
import Session from "../models/Session.schema.js";
import sessionQueryRepository from "./sessionQuery.repository.js";
import { getLocalDate } from "../../../helpers/localTimeHelper.js";

class SessionAssistantRepository {
  async getAssistant(session) {
    const sessionAssistant = await SessionAssistant.findOne({
      session: session.id,
      changeTime: null,
    }).populate({
      path: "user",
    });
    return sessionAssistant.user;
  }
  async changeAssistant(userId) {
    const session = await sessionQueryRepository.getToday();
    await SessionAssistant.findOneAndUpdate(
      { changeTime: null, session: session.id },
      { changeTime: getLocalDate() },
      { new: true }
    );
    const sessionAssistant = await SessionAssistant.create({
      user: userId,
      session: session.id,
    });
    await Session.findByIdAndUpdate(
      session.id,
      {
        $push: {
          assistants: sessionAssistant.id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return await SessionAssistant.findById(sessionAssistant.id).populate(
      "session"
    );
  }
}

const instance = new SessionAssistantRepository();

export default instance;

export { instance };
