import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import {
  getAllRequest,
  postAssistantRequest,
} from "../controllers/sessionAssistant.controller.js";
const router = express.Router();

router
  .route("/")
  .get(requiredAuthMiddleware, getAllRequest)
  .post(requiredAuthMiddleware, postAssistantRequest);

export default router;
