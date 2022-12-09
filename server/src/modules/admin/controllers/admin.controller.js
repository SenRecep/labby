import UserCreateDto from "../../auth/dtos/user.create.dto.js";
import adminService from "../services/admin.service.js";
import HttpStatusCodes from "http-status-codes";
import { ServiceResponse } from "../../../common/serviceResponse.js";

export const createAssistant = async (req, res,next) => {
  const addAAssistant = new UserCreateDto(req.body);
  try {
    const data = await adminService.createAssistant(addAAssistant);
    res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
  } catch (error) {
    next(error);
  }
};
