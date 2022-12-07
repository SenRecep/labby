import userService from "../services/user.service.js";
import UserCreateDto from "../dtos/user.create.dto.js";
import UserUpdateDto from "../dtos/user.update.dto.js";
import HttpStatusCodes from "http-status-codes";

export const getAllRequest = async (_, res) => {
  const data = await userService.getAll();
  return res.status(HttpStatusCodes.OK).json(data);
};

export const postRequest = async (req, res) => {
  const model = new UserCreateDto(req.body);
  try {
    const response = await userService.createUser(model);
    return res.status(HttpStatusCodes.CREATED).json(response);
  } catch (error) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(error.message);
  }
};

export const getByIdRequest = async (req, res) => {
  const data = await userService.getById(req.params.id);
  return res.status(HttpStatusCodes.OK).json(data);
};

export const getByRoleRequest = async (req, res) => {
  try {
    const { role } = req.params;
    const data = await userService.getAllByRole(role);
    return res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json(error.message);
  }
};

export const deleteByIdRequest = async (req, res) => {
  const { id } = req.params;
  await userService.deleteUser(id);
  return res.status(HttpStatusCodes.OK).json("User deleted");
};

export const updatePasswordByIdRequest = async (req, res) => {
  const model = new UserUpdateDto(req.body);
  const data = await userService.updatePassword(model);
  return res.status(HttpStatusCodes.OK).json(data);
};

export default {
  getAllRequest,
  postRequest,
  getByIdRequest,
  getByRoleRequest,
  deleteByIdRequest,
  updatePasswordByIdRequest,
};
