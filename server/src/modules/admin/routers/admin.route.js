import express from "express";
import { addAssistant,deleteUser,getAssistant } from "../controllers/admin.controller.js";
const router = express.Router();


router.route("/")
.get(getAssistant)
.post(addAssistant);

router.route("/:id")
.delete(deleteUser);

export default router;
