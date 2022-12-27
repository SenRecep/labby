import { ApiError } from "../../../common/apiError.js";
import Session from "../models/Session.schema.js";
import UserSession from "../models/UserSessions.schema.js";
import HttpStatusCodes from "http-status-codes";

class sessionQueryRepository {
    getByDate(date) {
        const query = {
          day: date.getDate() ,
          year: date.getFullYear(),
          month: date.getMonth()+ 1,
        };
       return Session.findOne({
          openTime: {
            $gte: new Date(`${query.year}-${query.month}-${query.day}`),
            $lt: new Date(`${query.year}-${query.month}-${query.day + 1}`),
          },
          closeTime:null
        });
      }
     async getThisDate() {
        const found = await this.getByDate(new Date());
        if (!found)
          throw new ApiError(
            "Session not found",
            HttpStatusCodes.BAD_REQUEST,
            "userSessionRepository->getBy"
          );
          
        return found;
      }
}

const instance = new sessionQueryRepository();

export default instance;

export { instance };
