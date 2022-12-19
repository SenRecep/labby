import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { getAllRequest } from "../controllers/sessionAssistant.controller.js";
import { getAllSessions, getByIdRequest, getOpenOrClose, getSessionsByDate, postCloseTimeRequest, postSessionRequest } from "../controllers/session.controller.js";
const router = express.Router();

// router
//   .route("/assistant")
//   .get(requiredAuthMiddleware,getAllRequest);


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
  .get(requiredAuthMiddleware,getOpenOrClose);

  router.route("/:id")
  .get(getByIdRequest);

  
  export default router;
  