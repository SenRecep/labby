import express from "express";
import { requiredRoleMiddleware } from "../../../middlewares/auth.middleware.js";
import {
  getAllSessions,
  getLabHistory,
  getLabStatus,
  getSessionsByDate,
  postCloseTimeRequest,
  postSessionRequest,
} from "../controllers/session.controller.js";
import { RoleInfo } from "../../../constants/roleInfo.js";
const router = express.Router();

router
  .route("/")
  .get(getSessionsByDate)
  .post(requiredRoleMiddleware([RoleInfo.assistant]), postSessionRequest)
  .put(requiredRoleMiddleware([RoleInfo.assistant]), postCloseTimeRequest);

router
  .route("/all")
  .get(requiredRoleMiddleware([RoleInfo.assistant]), getAllSessions);

router
  .route("/lab")
  .get(
    requiredRoleMiddleware([RoleInfo.assistant, RoleInfo.admin]),
    getLabStatus
  );

router
  .route("/history")
  .get(requiredRoleMiddleware([RoleInfo.assistant]), getLabHistory);

export default router;
