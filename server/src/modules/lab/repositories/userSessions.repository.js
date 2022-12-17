import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import UserSession from "../models/UserSessions.schema.js";
import HttpStatusCodes from "http-status-codes";

class userSessionRepository {
  async createUserSession(userId) {
    const findSessionDate = await this.getDate(new Date());
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
  getByDate(date) {
    const querry = {
      day: date.getDate() + 1,
      year: date.getFullYear(),
      month: date.getMonth(),
    };
    return Session.findOne({
      openTime: {
        $gte: new Date(querry.year, querry.month, querry.day),
        $lt: new Date(querry.year, querry.month, querry.day + 1),
      },
    });
  }
  getDate() {
    const found = this.getByDate(new Date());
    if (!found)
      throw new ApiError(
        "Session not found",
        HttpStatusCodes.BAD_REQUEST,
        "userSessionRepository->getBy"
      );
    return found;
  }
  async addExitTime(userId) {
    const found = await this.getDate();
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
    const found = await this.getDate(new Date());
    const getUser = await UserSession.find({ session: found._id });
    return getUser;
  }
  async getAllUserSessions() {
    const getUser = await UserSession.find({});
    return getUser;
  }
  async getAllUsersInLab() {
    const found = await this.getDate(new Date());
    const getUser = await UserSession.find({
      session: found._id,
      exitTime: null,
    });
    return getUser;
  }
  async numberOfUsersInLab(){
    const number = (await this.getAllUsersInLab()).length;
    return number;
  }
}

const instance = new userSessionRepository();

export default instance;

export { instance };
