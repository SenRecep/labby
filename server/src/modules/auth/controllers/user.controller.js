import userService from "../services/user.service.js";
import UserCreateDto from "../dtos/user.create.dto.js";
import UserUpdateDto from "../dtos/user.update.dto.js";
import UserTokenUpdateDto from "../dtos/userTokenUpdate.dto.js";
import { ServiceResponse } from "../../../common/serviceResponse.js";
import HttpStatusCodes from "http-status-codes";
import UserViewDto from "../dtos/userView.dto.js";
import { RoleInfo } from "../../../constants/roleInfo.js";

export const getAllRequest = async (req, res) => {
  const data = await userService.getAll();
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const postRequest = async (req, res, next) => {
  const isAdmin = req.user?.role == RoleInfo.admin || false;
  const model = new UserCreateDto(req.body, isAdmin);
  try {
    const response = await userService.createUser(model);
    return res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    next(error);
  }
};

export const getByIdRequest = async (req, res) => {
  const data = await userService.getById(req.params.id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const getByTokenRequest = async (req, res) => {
  return res
    .status(HttpStatusCodes.OK)
    .json(
      ServiceResponse.successWithData(
        new UserViewDto(req.user),
        HttpStatusCodes.OK
      )
    );
};

export const getByRoleRequest = async (req, res, next) => {
  try {
    const { role } = req.params;
    const data = await userService.getAllByRole(role);
    return res
      .status(HttpStatusCodes.OK)
      .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
  } catch (error) {
    next(error);
  }
};

export const deleteByIdRequest = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(null, HttpStatusCodes.OK));
};

export const updatePasswordByIdRequest = async (req, res) => {
  const model = new UserUpdateDto(req.body);
  const data = await userService.updatePassword(model);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export const updateNotifyTokenByIdRequest = async (req, res) => {
  const model = new UserTokenUpdateDto(req.body);
  const data = await userService.updateToken(model);
  return res
    .status(HttpStatusCodes.OK)
    .json(ServiceResponse.successWithData(data, HttpStatusCodes.OK));
};

export default {
  getAllRequest,
  postRequest,
  getByIdRequest,
  getByTokenRequest,
  getByRoleRequest,
  deleteByIdRequest,
  updatePasswordByIdRequest,
  updateNotifyTokenByIdRequest,
};
