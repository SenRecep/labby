import sessionService from "../services/session.service.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const getAllSessions = async (req, res) => {
  const data = await sessionService.getByDate();
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};
export const postSessionRequest = async (req, res, next) => {
  const assistantId = req.body.assistant;
  try {
    const response = await sessionService.createSession(assistantId);
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getByIdRequest = async (req, res) => {
  const data = await sessionService.getById(req.params.id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  getAllSessions,
  postSessionRequest,
  getByIdRequest,
};
