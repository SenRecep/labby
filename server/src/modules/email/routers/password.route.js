import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { changePasswordRequest, sendVerificationCodeRequest, verificationCodeRequest } from "../controllers/verificationCode.controller.js";
const router = express.Router();


  router
  .route("/email")
  .post(sendVerificationCodeRequest);

  router
  .route("/code")
  .post(verificationCodeRequest);

  router
  .route("/password")
  .put(changePasswordRequest);


  export default router;
  