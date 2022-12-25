import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import UserSession from "../models/UserSessions.schema.js";
import HttpStatusCodes from "http-status-codes";
import sessionQueryRepository from "./sessionQuery.repository.js";

class userSessionRepository {
  async createUserSession(userId) {
    const findSessionDate = await sessionQueryRepository.getThisDate();
    if (!findSessionDate || findSessionDate.closeTime != null)
      throw new ApiError(
        "Session not found",
        HttpStatusCodes.BAD_REQUEST,
        "userSessionRepository->userSesRepository"
      );

    const userSession = await UserSession.create({
      user: userId,
      session: findSessionDate._id,
    });
    const update = await Session.findByIdAndUpdate(
      findSessionDate._id,
      {
        $push: {
          userSessions: userSession._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return userSession;
  }
  async addExitTime(userId) {
    const found = await sessionQueryRepository.getThisDate();
    const updateTime = await UserSession.findOneAndUpdate(
      {
        session: found._id,
        userId: userId,
        exitTime: null,
      },
      {
        exitTime: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );
    return updateTime;
  }
  async getAllUserSessionsByDate() {
    const found = await sessionQueryRepository.getThisDate();
    const getUser = await UserSession.find({ session: found._id });
    return getUser;
  }
  async getAllUserSessions() {
    const getUser = await UserSession.find({});
    return getUser;
  }
  async getAllUsersInLab() {
    const found = await sessionQueryRepository.getThisDate();
    if (!found)
      throw new Error(
        "Close",
        HttpStatusCodes.BAD_REQUEST,
        "userSessionRepository->getAllUsersInLab"
      );
      const getUser = await UserSession.find({
      session: found._id,
      exitTime: null,
    }).populate("user");
    return getUser;  
  }
  async numberOfUsersInLab(){
    const number = (await this.getAllUsersInLab()).length;
    const rate = (number*100)/50;
    console.log(`%${rate}`);
    return number;
  }
}

const instance = new userSessionRepository();

export default instance;

export { instance };
