import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import UserSession from "../models/UserSessions.schema.js";
import HttpStatusCodes from "http-status-codes";
import sessionQueryRepository from "./sessionQuery.repository.js";
import { getLocalDate } from "../../../helpers/localTimeHelper.js";

class UserSessionRepository {
  async createUserSession(userId) {
    const session = await sessionQueryRepository.getToday();
    if (!session || session.closeTime != null)
      throw new ApiError(
        "Session not found",
        HttpStatusCodes.BAD_REQUEST,
        "UserSessionRepository->userSesRepository"
      );
      const userInLab= await this.isUserInLab(userId);
      if(userInLab) 
      throw new ApiError(
        "User already in lab",
        HttpStatusCodes.BAD_REQUEST,
        "UserSessionRepository->userSesRepository"
      );
    const userSession = await UserSession.create({
      user: userId,
      session: session.id,
      entryTime: getLocalDate(),
    });
    await Session.findByIdAndUpdate(
      session.id,
      {
        $push: {
          userSessions: userSession.id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return userSession;
  }
  async addExitTime(userId) {
    const found = await sessionQueryRepository.getToday();
    const updateTime = await UserSession.findOneAndUpdate(
      {
        session: found.id,
        user: userId,
        exitTime: null,
      },
      {
        exitTime: getLocalDate(),
      },
      { new: true, useFindAndModify: false }
    );
    return updateTime;
  }
  async getAllUserSessionsByDate() {
    const found = await sessionQueryRepository.getToday();
    const getUser = await UserSession.find({ session: found.id })
      .populate("user")
      .sort({ entryTime: "desc" });
    return getUser;
  }
  async getUserSessionsByUserId(userId) {
    const found = await sessionQueryRepository.getToday();
    const userSessions = await UserSession.find({
      session: found.id,
      user: userId,
    }).sort({ entryTime: "desc" });
    return userSessions;
  }
  async getAllUserSessions() {
    const getUser = await UserSession.find({});
    return getUser;
  }
  async getUserSessionsById(userId) {
    const sessions = await UserSession.find({
      user: userId,
    });
    return sessions;
  }
  async getAllUsersInLab() {
    const found = await sessionQueryRepository.getToday();
    const userSession = await UserSession.find({
      session: found.id,
      exitTime: null,
    })
      .populate("user")
      .sort({ entryTime: "desc" });
    return userSession;
  }
  async isUserInLab(userId) {
    const foundSession = await UserSession.findOne({
      exitTime: null,
      user: userId,
    });
    return foundSession != null;
  }
}

const instance = new UserSessionRepository();

export default instance;

export { instance };
