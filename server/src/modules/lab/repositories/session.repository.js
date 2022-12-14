import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import SessionAssistant from "../models/SessionAssistant.schema.js";

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
  getAllSessions() {
    return Session.find({}).populate("assistant");
  }
  async getAll(date) {
    return Session.find({}).populate("assistants userSessions");
  }

  getDate() {
    const found = this.ifExistDate(new Date());
    if (!found)
      throw new ApiError(
        "Session not found",
        HttpStatusCodes.BAD_REQUEST,
        "sessionRepository->getBy"
      );

    return found;
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
    }).populate("assistants userSessions");
  }
  getById(id) {
    return Session.findById(id);
  }
}

const instance = new sessionRepository();

export default instance;

export { instance };
