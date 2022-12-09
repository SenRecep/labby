import { ServiceResponse } from "../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const notFoundMiddleware = (req, res, next) => {
  return res
    .status(HttpStatusCodes.NOT_FOUND)
    .json(
      ServiceResponse.fail(
        HttpStatusCodes.NOT_FOUND,
        true,
        "notFoundMiddleware",
        ["Endpoint not found"]
      )
    );
};
