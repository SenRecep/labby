import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { postUserSessionRequest , getAllUserSessions,postExitTimeRequest, getAllUsersInLab, numberOfUsersInLab, getAllUserSessionsByDate} from "../controllers/userSession.controller.js";
const router = express.Router();


  router
  .route("/")
  .get(requiredAuthMiddleware,getAllUserSessionsByDate)
  .post(postUserSessionRequest)
  .put(postExitTimeRequest);

  router
  .route("/all")
  .get(requiredAuthMiddleware,getAllUserSessions);

  router
  .route("/inlab")
  .get(requiredAuthMiddleware,getAllUsersInLab);
  
  export default router;
  