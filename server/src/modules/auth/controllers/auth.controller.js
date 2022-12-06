import userService from "../services/user.service.js";
import UserCreateDto from "../dtos/user.create.dto.js";
import UserUpdateDto from "../dtos/user.update.dto.js";
import SignInDto from "../dtos/sigIn.dto.js";
import SignInResponseDto from "../dtos/signInResponse.dto.js";
import jwtToken from "../services/auth.service.js";

export const getAllRequest = async (req, res) => {
  const data = await userService.getAll();
  res.status(200).json(data);
};

export const postRequest = async (req, res) => {
  const userToAdd = new UserCreateDto(req.body);
  try {
    const response = await userService.createUser(userToAdd);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const signIn = async (req, res) => {
  const userToLogIn = new SignInDto(req.body);
  try {
    const user = await userService.getUser(userToLogIn);
    const token = jwtToken.creatToken(user);
    const response = new SignInResponseDto(token);
    res.status(201).json(response);
  } catch (error) {
    console.log("succes", error);
    res.status(400).json(error);
  }
};

export const getByIdRequest = async (req, res) => {
  const data = await userService.getById(req.params.id);
  res.status(200).json(data);
};

export const deleteByIdRequest = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(200).json("User deleted");
};

export const updatePasswordByIdRequest = async (req, res) => {
  const userToUpdate = new UserUpdateDto(req.body);
  const data = await userService.updatePassword(userToUpdate);
  res.status(200).json(data);
};
