import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { getAllRequest } from "../controllers/sessionAssistant.controller.js";
const router = express.Router();

router
  .route("/")
  .get(requiredAuthMiddleware,getAllRequest);

  export default router;
  