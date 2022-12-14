import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import UserSession from "../models/UserSessions.schema.js";
import HttpStatusCodes from "http-status-codes";

class userSessionRepository {
  async createUserSession(userId) {
    const findSessionDate = await this.ifExistDate(new Date());
    if (!findSessionDate)
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
  ifExistDate(date) {
    return this.getByDate(date);
  }
  getByDate(date) {
    const querry = {
      day: date.getDate(),
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
    return Session.findOne({
      date: {
        $gte: new Date(querry.year, querry.month, querry.day),
        $lt: new Date(querry.year, querry.month, querry.day + 1),
      },
    });
  }
  getAllUserSessions() {
    return UserSession.find({});
  }
}

const instance = new userSessionRepository();

export default instance;

export { instance };
