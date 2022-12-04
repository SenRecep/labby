import {body , validationResult} from "express-validator";
import { validationResponseMiddleware } from "../../../middlewares/validationResponse.middleware.js";
import UserCreateDto from "../dtos/user.create.dto.js";
import UserUpdateDto from "../dtos/user.update.dto.js";

export const userValidator = [
    body('email')
      .trim()
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail()
      .toLowerCase(),
    body('password').trim().isLength(2).withMessage("Password is too short"),
  ]
