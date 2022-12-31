import express from "express";
import {
  requiredAuthMiddleware,
  requiredRoleMiddleware,
} from "../../../middlewares/auth.middleware.js";
import { changeAssistantRequest } from "../controllers/sessionAssistant.controller.js";
import { RoleInfo } from "../../../constants/roleInfo.js";
const router = express.Router();

router
  .route("/")
  .post(
    requiredAuthMiddleware,
    requiredRoleMiddleware([RoleInfo.assistant]),
    changeAssistantRequest
  );

export default router;
