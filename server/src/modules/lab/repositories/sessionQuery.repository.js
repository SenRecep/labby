import moment from "moment";
import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import HttpStatusCodes from "http-status-codes";
class SessionQueryRepository {
  getByDate({ startDate, endDate }) {
    return Session.findOne({
      openTime: {
        $gte: startDate,
        $lt: endDate,
      },
      closeTime: null,
    });
  }
  async findToday() {
    const today = moment().startOf("day");
    const found = await this.getByDate({
      startDate: today.toDate(),
      endDate: moment(today).endOf("day").toDate(),
    });
    return found;
  }
  async getToday() {
    const found = await this.findToday();
    if (!found)
      throw new ApiError(
        "Session not found",
        HttpStatusCodes.NOT_FOUND,
        "SessionQueryRepository->getToday"
      );

    return found;
  }
}

const instance = new SessionQueryRepository();

export default instance;

export { instance };
