import authService from "../services/auth.service.js";
import UserCreateDto from "../dtos/user.create.dto.js";
import UserUpdateDto from "../dtos/user.update.dto.js";

export const getAllRequest = async (req, res) => {
  const data = await authService.getAll();
  res.status(200).json(data);
};

export const postRequest = (req, res) => {
  const userToAdd = new UserCreateDto(req.body);
  res.status(201).json(authService.createUser(userToAdd));
};

export const getByIdRequest = async (req, res) => {
  const data = await authService.getById(req.params.id);
  res.status(200).json(data);
};

export const deleteByIdRequest=async(req,res)=>{
    await authService.deleteUser(req.params.id);
    res.status(200).json("User deleted");
}

export const updatePasswordByIdRequest=async (req,res)=>{
    const userToUpdate=new UserUpdateDto(req.body);
    const data=await authService.updatePassword(userToUpdate);
    res.status(200).json(data);
}
