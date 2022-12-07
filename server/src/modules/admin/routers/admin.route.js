import express from "express";
import { createAssistant } from "../controllers/admin.controller.js";
const router = express.Router();

router.route("/").post(createAssistant);

export default router;
