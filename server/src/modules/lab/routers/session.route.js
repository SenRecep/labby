import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { getAllRequest } from "../controllers/sessionAssistant.controller.js";
import { getAllSessions, getByIdRequest, postSessionRequest } from "../controllers/session.controller.js";
import { postUserSessionRequest , getAllUserSessions} from "../controllers/userSession.controller.js";
const router = express.Router();

router
  .route("/assistant")
  .get(requiredAuthMiddleware,getAllRequest);

  router.route("/:id")
  .get(getByIdRequest);

  router
  .route("/")
  .get(requiredAuthMiddleware,getAllSessions)
  .post(postSessionRequest);

  router
  .route("/userSession")
  .get(requiredAuthMiddleware,getAllUserSessions)
  .post(postUserSessionRequest);

  
  export default router;
  