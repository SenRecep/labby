import sessionAssistantService from "../services/sessionAssistant.service.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const changeAssistantRequest = async (req, res) => {
  const data = await sessionAssistantService.changeAssistant(
    req.body.assistants
  );
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  changeAssistantRequest,
};
