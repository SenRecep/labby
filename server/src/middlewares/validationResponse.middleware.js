import { validationResult } from "express-validator";
import { ServiceResponse } from "../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const validationResponseMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map((x) => x.msg);
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(
        ServiceResponse.fail(
          HttpStatusCodes.BAD_REQUEST,
          true,
          "validationResponseMiddleware",
          messages
        )
      );
  }
  return next();
};
