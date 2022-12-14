import mongoose from "mongoose";
import userSessionService from "../services/userSession.service.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const postUserSessionRequest = async (req, res, next) => {
  try {
    const response = await userSessionService.createUserSession();
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getAllUserSessions = async (req, res, next) => {
  const data = await userSessionService.getAllUserSessions();
  return res
    .status(HttpStatusCodes.CREATED)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
};

export default {
  postUserSessionRequest,
  getAllUserSessions,
};
