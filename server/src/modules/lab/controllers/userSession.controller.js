import userSessionService from "../services/userSession.service.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const postUserSessionRequest = async (req, res, next) => {
  const user = req.user.id;
  try {
    const response = await userSessionService.createUserSession(user);
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getAllUserSessions = async (req, res, next) => {
  try {
    const data = await userSessionService.getAllUserSessions();
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getAllUserSessionsByDate = async (req, res, next) => {
  try {
    const data = await userSessionService.getAllUserSessionsByDate();
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getAllUsersInLab = async (req, res, next) => {
  try {
    const data = await userSessionService.getAllUsersInLab();
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getUserSessionsById = async (req, res, next) => {
  try {
    const data = await userSessionService.getUserSessionsById(req.user.id);
    return res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
  } catch (error) {
    next(error);
  }
};

export const postExitTimeRequest = async (req, res, next) => {
  try {
    const response = await userSessionService.addExitTime(req.user.id);
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const numberOfUsersInLab = async (req, res, next) => {
  try {
    const data = await userSessionService.numberOfUsersInLab();
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getIntensity = async (req, res, next) => {
  try {
    const data = await userSessionService.intensity();
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const isUserInLab = async (req, res, next) => {
  try {
    const data = await userSessionService.isUserInLab(req.user.id);
    return res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
  } catch (error) {
    next(error);
  }
};

export default {
  postUserSessionRequest,
  getAllUserSessions,
  postExitTimeRequest,
  getAllUsersInLab,
  numberOfUsersInLab,
  getAllUserSessionsByDate,
  getIntensity,
  isUserInLab,
  getUserSessionsById,
};
