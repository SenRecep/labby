import sessionService from "../services/session.service.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import labStatus from "../repositories/labStatus.repository.js";

export const getSessionsByDate = async (req, res,next) => {
  try {
    const data = await sessionService.getByDate();
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
  } catch (error) {
    next(error);
  }
};

export const getAllSessions = async (req, res) => {
  const data = await sessionService.getAll();
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
export const postCloseTimeRequest = async (req, res, next) => {
  try {
    const response = await sessionService.addCloseTime();
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

export const getLabStatus = async (req, res, next) => {
  
  try {
    const data = await labStatus.getLabStatus();
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export default {
  getAllSessions,
  postSessionRequest,
  getByIdRequest,
  postCloseTimeRequest,
  getSessionsByDate,
  getLabStatus
};
