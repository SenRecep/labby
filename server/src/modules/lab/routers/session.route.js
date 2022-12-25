import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { getAllSessions, getByIdRequest, getLabStatus, getSessionsByDate, postCloseTimeRequest, postSessionRequest } from "../controllers/session.controller.js";
import { getIntensity, numberOfUsersInLab } from "../controllers/userSession.controller.js";
const router = express.Router();


  router
  .route("/")
  .get(requiredAuthMiddleware,getSessionsByDate)
  .post(postSessionRequest)
  .put(postCloseTimeRequest);

  router
  .route("/all")
  .get(requiredAuthMiddleware,getAllSessions);

  router
  .route("/lab")
  .get(requiredAuthMiddleware,getLabStatus);

  router.route("/:id")
  .get(getByIdRequest);

  
  export default router;
  