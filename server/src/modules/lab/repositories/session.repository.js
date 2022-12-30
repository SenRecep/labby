import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import SessionAssistant from "../models/SessionAssistant.schema.js";
import sessionQueryRepository from "./sessionQuery.repository.js";
import HttpStatusCodes from "http-status-codes";
import UserSession from "../models/UserSessions.schema.js";
import { getLocalDate } from "../../../helpers/localTimeHelper.js";
class sessionRepository {
  async createSession(userId) {
    const foundSession = await Session.find({
      closeTime: null,
    });
    console.log(foundSession);
    if (foundSession.length > 0) {
      throw new ApiError(
        "Session is already exist",
        HttpStatusCodes.BAD_REQUEST,
        "sessionRepository->getByDate"
      );
    }
    const session = await Session.create({
      openTime: getLocalDate(),
    });
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
    const found = await sessionQueryRepository
      .getByDate(getLocalDate())
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
    return found;
  }
  async addCloseTime() {
    const found = await sessionQueryRepository.getThisDate();
    const updateTime = await Session.findByIdAndUpdate(
      found._id,
      {
        closeTime: getLocalDate(),
      },
      { new: true, useFindAndModify: false }
    );
    const update = await UserSession.updateMany(
      { session: found._id },
      {
        exitTime: new Date(),
      },
      { new: true, useFindAndModify: false }
    );
    return updateTime;
  }
  getById(id) {
    return Session.findById(id);
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

const instance = new sessionRepository();

export default instance;

export { instance };
