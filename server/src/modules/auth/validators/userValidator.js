import { body } from "express-validator";

export const userValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email")
    .normalizeEmail()
    .toLowerCase(),
  body("password").trim().isLength(2).withMessage("Password is too short"),
  body("phone").trim().isLength(10).isMobilePhone("tr-TR").withMessage("Invalid phone number.")
];
