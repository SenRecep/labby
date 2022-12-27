import sessionAssistantService from "../services/sessionAssistant.service.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const getAllRequest = async (req, res) => {
  const data = await sessionAssistantService.getAll(req.user.id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};
export const getByIdRequest = async (req, res) => {
  const data = await sessionAssistantService.getById(req.params.id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};



export const postAssistantRequest = async (req, res) => {
  const data = await sessionAssistantService.postAssistant(req.body.assistants);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  getAllRequest,
  getByIdRequest,
  postAssistantRequest
};
