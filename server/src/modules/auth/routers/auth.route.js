import express from "express";
import { getRequest } from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/").get(getRequest);

export default router;
