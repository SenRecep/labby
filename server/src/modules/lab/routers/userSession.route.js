import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import {
  postUserSessionRequest,
  getAllUserSessions,
  postExitTimeRequest,
  getAllUsersInLab,
  getAllUserSessionsByDate,
  isUserInLab,
  getUserSessionsById,
} from "../controllers/userSession.controller.js";
const router = express.Router();

router
  .route("/")
  .get(requiredAuthMiddleware, isUserInLab)
  .post(requiredAuthMiddleware, postUserSessionRequest)
  .put(requiredAuthMiddleware, postExitTimeRequest);

router.route("/userhistory").get(requiredAuthMiddleware, getUserSessionsById);

router.route("/all").get(requiredAuthMiddleware, getAllUserSessions);

router.route("/date").get(requiredAuthMiddleware, getAllUserSessionsByDate);

router.route("/inlab").get(requiredAuthMiddleware, getAllUsersInLab);

export default router;
