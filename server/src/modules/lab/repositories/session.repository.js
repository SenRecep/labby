import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import SessionAssistant from "../models/SessionAssistant.schema.js";
import sessionQueryRepository from "./sessionQuery.repository.js";
import HttpStatusCodes from "http-status-codes";
import UserSession from "../models/UserSessions.schema.js";

class sessionRepository {
  async createSession(userId) {
    const session = await Session.create({});
    const sessionAssistant = await SessionAssistant.create({
      user: userId,
      session: session._id,
    });
    const update = await Session.findByIdAndUpdate(
      session._id,
      {
        $push: {
          assistants: sessionAssistant._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return await Session.findById(session._id).populate("assistants");
  }
  async getAll() {
    return Session.find({})
      .populate({
        path: "assistants",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "userSessions",
        populate: {
          path: "user",
        },
      });
  }

 async getByDate() {
   const found = await sessionQueryRepository.getByDate(new Date())
      .populate({
        path: "assistants",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "userSessions",
        populate: {
          path: "user",
        },
      });
      if (!found)
      throw new ApiError(
        "Session not found",
        HttpStatusCodes.BAD_REQUEST,
        "sessionRepository->getByDate"
      );
      return found
  }
  async addCloseTime() {
    const found = await sessionQueryRepository.getThisDate();
    const updateTime = await Session.findByIdAndUpdate(
      found._id,
      {
        closeTime: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );
    const update = await UserSession.updateMany(
      {session:found._id},
      {
        exitTime: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );
    return updateTime;
  }
  getById(id) {
    return Session.findById(id);
  }
}

const instance = new sessionRepository();

export default instance;

export { instance };
