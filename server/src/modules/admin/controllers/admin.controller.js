import UserCreateDto from "../../auth/dtos/user.create.dto.js";
import adminService from "../services/admin.service.js";
import HttpStatusCodes from "http-status-codes";

export const createAssistant = async (req, res) => {
  const addAAssistant = new UserCreateDto(req.body);
  try {
    const data = await adminService.createAssistant(addAAssistant);
    res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json(error.message);
  }
};