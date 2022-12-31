import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import SessionAssistant from "../models/SessionAssistant.schema.js";
import sessionQueryRepository from "./sessionQuery.repository.js";
import HttpStatusCodes from "http-status-codes";
import UserSession from "../models/UserSessions.schema.js";
import { getLocalDate } from "../../../helpers/localTimeHelper.js";
class SessionRepository {
  async createSession(userId) {
    const foundSession = await sessionQueryRepository.findToday();
    if (foundSession) {
      throw new ApiError(
        "Session is already exist",
        HttpStatusCodes.BAD_REQUEST,
        "SessionRepository->createSession"
      );
    }
    const session = await Session.create({
      openTime: getLocalDate(),
    });
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
    return await Session.findById(session.id).populate("assistants");
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
    const found = await sessionQueryRepository
      .getToday()
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
        "SessionRepository->getByDate"
      );
    return found;
  }
  async addCloseTime() {
    const found = await sessionQueryRepository.getToday();
    const updated = await Session.findByIdAndUpdate(
      found.id,
      {
        closeTime: getLocalDate(),
      },
      { new: true, useFindAndModify: false }
    );
    await UserSession.updateMany(
      { session: found.id },
      {
        exitTime: getLocalDate(),
      },
      { new: true, useFindAndModify: false }
    );
    return updated;
  }
  async getLabHistory() {
    const sessionList = await Session.find({})
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
      })
      .sort({
        openTime: "desc",
      });

    sessionList.forEach((session) => {
      session.visitors = [
        ...new Set(session.userSessions.map((item) => item.user.id)),
      ].length;
    });

    return sessionList;
  }
}

const instance = new SessionRepository();

export default instance;

export { instance };
