import express from "express";
import {
  postUserSessionRequest,
  postExitTimeRequest,
  getAllUsersInLab,
  getAllUserSessions,
  isUserInLab,
  getUserSessionsByUserId,
} from "../controllers/userSession.controller.js";
const router = express.Router();

router
  .route("/")
  .get(isUserInLab)
  .post(postUserSessionRequest)
  .put(postExitTimeRequest);

router.route("/userhistory").get(getUserSessionsByUserId);

router.route("/date").get(getAllUserSessions);

router.route("/inlab").get(getAllUsersInLab);

export default router;
