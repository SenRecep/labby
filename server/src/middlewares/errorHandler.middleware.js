import { ServiceResponse } from "../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const errorHandlerMiddleware = async (err, req, res, next) => {
  if (err) {
    const status = err.status || HttpStatusCodes.INTERNAL_SERVER_ERROR;
    const path = err.path || "global";
    // console.error(err);
    return res.json(ServiceResponse.fail(status, true, path, [err.message]));
  }
  next();
};
