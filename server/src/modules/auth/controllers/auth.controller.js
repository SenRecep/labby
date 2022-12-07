import authService from "../services/auth.service.js";
import SignInDto from "../dtos/sigIn.dto.js";
import HttpStatusCodes from "http-status-codes";

export const signIn = async (req, res) => {
  const model = new SignInDto(req.body);
  try {
    const response = await authService.signIn(model);
    res.status(HttpStatusCodes.CREATED).json(response);
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json(error.message);
  }
};
