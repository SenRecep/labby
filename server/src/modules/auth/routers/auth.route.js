import express from "express";
import { signIn } from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/").post(signIn);

export default router;
