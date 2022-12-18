import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import SessionAssistant from "../models/SessionAssistant.schema.js";

import HttpStatusCodes from "http-status-codes";

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

  async getDate() {
    const found = await this.getByDate(new Date());
    if (!found) {
      throw new ApiError(
        "Session not found",
        HttpStatusCodes.BAD_REQUEST,
        "sessionRepository->getBy"
      );
    }
    return found;
  }
  getByDate(date) {
    const query = {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
    return Session.findOne({
      openTime: {
        $gte: new Date(`${query.year}-${query.month}-${query.day}`),
        $lt: new Date(`${query.year}-${query.month}-${query.day + 1}`),
      },
    })
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
  async addCloseTime() {
    const found = await this.getDate();
    const updateTime = await Session.findByIdAndUpdate(
      found._id,
      {
        closeTime: Date.now(),
      },
      { new: true, useFindAndModify: false }
    );
    return updateTime;
  }
  getById(id) {
    return Session.findById(id);
  }
  async getOpenOrClose() {
    const lab = await this.getDate();
    if (lab.exitTime == null) {
      return "break";
    } else {
      return "close";
    }
  }
}

const instance = new sessionRepository();

export default instance;

export { instance };
