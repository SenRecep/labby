import authService from "../services/auth.service.js";
import SignInDto from "../dtos/sigIn.dto.js";
import HttpStatusCodes from "http-status-codes";
import { ServiceResponse } from "../../../common/serviceResponse.js";

export const signIn = async (req, res) => {
  const model = new SignInDto(req.body);
  try {
    const response = await authService.signIn(model);
    res
      .status(HttpStatusCodes.CREATED)
      .json(ServiceResponse.successWithData(response, HttpStatusCodes.CREATED));
  } catch (error) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(
        ServiceResponse.fail(
          HttpStatusCodes.BAD_REQUEST,
          true,
          "auth->signIn",
          [error.message]
        )
      );
  }
};
