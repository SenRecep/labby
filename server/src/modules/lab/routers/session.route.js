import express from "express";
import { requiredAuthMiddleware } from "../../../middlewares/auth.middleware.js";
import { getAllRequest, postRequest } from "../controllers/sessionAssistant.controller.js";
const router = express.Router();

router
  .route("/")
  .get(requiredAuthMiddleware,getAllRequest)
  .post(postRequest);

  
  export default router;
  