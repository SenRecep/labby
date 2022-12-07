import UserCreateDto from "../../auth/dtos/user.create.dto.js";
import adminService from "../services/admin.service.js";

export const addAssistant = async (req, res) => {
  const addAAssistant = new UserCreateDto(req.body);
  try {
    const data = await adminService.createAssistant(addAAssistant);
    console.log(data);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getAssistant = async (req, res) => {
  const data = await adminService.getAllUser();
  res.status(200).json(data);
};

export const deleteUser = async (req, res) => {
  await adminService.deleteUser(req.params.id);
  res.status(200).json("User deleted");
};
