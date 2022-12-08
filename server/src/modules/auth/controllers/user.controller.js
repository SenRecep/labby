import userService from "../services/user.service.js";
import UserCreateDto from "../dtos/user.create.dto.js";
import UserUpdateDto from "../dtos/user.update.dto.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";

export const getAllRequest = async (_, res) => {
  const data = await userService.getAll();
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const postRequest = async (req, res) => {
  const model = new UserCreateDto(req.body);
  try {
    const response = await userService.createUser(model);
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(error.message);
  }
};

export const getByIdRequest = async (req, res) => {
  const data = await userService.getById(req.params.id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const getByRoleRequest = async (req, res) => {
  try {
    const { role } = req.params;
    const data = await userService.getAllByRole(role);
    return res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
  } catch (error) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(error.message);
  }
};

export const deleteByIdRequest = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res //.status(HttpStatusCodes.OK).json("User deleted");
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(HttpStatusCodes.OK));
};

export const updatePasswordByIdRequest = async (req, res) => {
  const model = new UserUpdateDto(req.body);
  const data = await userService.updatePassword(model);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  getAllRequest,
  postRequest,
  getByIdRequest,
  getByRoleRequest,
  deleteByIdRequest,
  updatePasswordByIdRequest,
};
